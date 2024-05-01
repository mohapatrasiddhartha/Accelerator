import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  menuItems = [
    { link: '/home', label: 'Home' },
    { link: '/about', label: 'About' },
    { link: '/contact', label: 'Contact' },
  ];

  isOpened = false; // Flag to control sidebar visibility

  toggleSidebar() {
    this.isOpened = !this.isOpened;
  }
}
