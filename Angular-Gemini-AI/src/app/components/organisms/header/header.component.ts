import { Component } from '@angular/core';
import { LogoItemComponent } from '../../atom/logo-item/logo-item.component';
import { NavItemComponent } from '../../atom/nav-item/nav-item.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoItemComponent, NavItemComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
