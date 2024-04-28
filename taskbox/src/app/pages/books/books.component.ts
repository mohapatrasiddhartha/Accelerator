import { Component, inject } from '@angular/core';
import { BooksStore } from 'src/app/store/book-store';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  providers: [BooksStore]
})
export class BooksComponent {
  readonly store = inject(BooksStore);
}
