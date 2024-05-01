import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../../data.service';
import { API_KEY_CONF } from '../../../../config';
import { FormControl, FormGroup } from '@angular/forms';
import { GeminiConfig } from '../../../chat-form';
import { ConvertTextToHtmlPipe } from '../../../convert-text-to-html.pipe';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [ConvertTextToHtmlPipe],
  templateUrl: './prompt-input.component.html',
  styleUrl: './prompt-input.component.scss'
})
export class PromptInputComponent {
  formValue = signal<string>('');
  message = '';
  loading: boolean =false
  messagesHistory: Array<any> = [];
  temperatureOptions = [
    { value: 0.2, label: 'Low Creativity' },
    { value: 0.5, label: 'Moderate Creativity' },
    { value: 0.9, label: 'High Creativity' },
  ];
  characterSelection = [
    {
      id: 0,
      value: 'Behram',
    },
    {
      id: 1,
      value: 'Gemini',
    },
  ];
  modelOptions = [
    { label: 'Gemini v1.0.0-Pro (Basic)', value: 'gemini-1.0-pro' },
    { label: 'Gemini v1.0.0-Pro-001 (Updated)', value: 'gemini-1.0-pro-001' },
    {
      label: 'Gemini v1.5 (Experimental)',
      value: 'gemini-1.5-pro',
      disabled: true,
    },
  ];
  chatForm = new FormGroup({
    apiKey: new FormControl(API_KEY_CONF || ''),
    temperature: new FormControl(this.temperatureOptions[2].value),
    bot: new FormControl(this.characterSelection[0]),
    model: new FormControl(this.modelOptions[0].value),
  });
  public loadingConfig = {
    animationType: ngxLoadingAnimationTypes.circleSwish,
    primaryColour: '#ffffff',
    secondaryColour: '#ccc',
    tertiaryColour: '#dd0031',
    backdropBorderRadius: '3px',
  };

  private dataService = inject(DataService);
  sendMessage($event: any) {
    // this.formValue.update($event.target.value);
    this.message = $event.target.value;
    this.messagesHistory.push(
      {
        role: 'user',
        parts: '',
      },
      {
        role: 'model',
        parts: '',
      }
    );
    this.dataService
      .generateContentWithGeminiPro(
        this.message,
        this.messagesHistory,
        this.chatForm.value as GeminiConfig
      )
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.messagesHistory = this.messagesHistory.slice(0, -2);
          this.messagesHistory.push(
            {
              role: "user",
              parts: this.message,
            },
            {
              role: "model",
              parts: res,
            }
          );
          $event.target.value = '';
          // setTimeout(() => this.scrollToBottom(), 0);
        },
        error: (error) => {
          console.error('Error generating content:', error);
        },
      });
  }
}
