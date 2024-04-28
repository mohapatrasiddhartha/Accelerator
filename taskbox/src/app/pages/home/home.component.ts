import { Component, computed, signal } from '@angular/core';
import ButtonComponent from 'src/stories/button.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  count = signal(0);
  double = computed(() => this.count() * 2);

  // Traditional Angular change detection relies on zone.js and can be inefficient,
  // especially with complex component hierarchies.
  // Signals offer a more granular approach. 
  // When a signal's value changes, Angular can identify exactly which parts of the component tree depend on that signal and 
  // only update those parts. This leads to better performance and avoids unnecessary re-renders.

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => Math.max(value - 1, 0)); // Ensure value doesn't go below 0
  }
}
