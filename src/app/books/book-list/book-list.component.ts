import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {
  booksList : Book[] = [];
  subscription: Subscription;
  
  constructor(
    private bookService: BookService
  ) { }
  
  ngOnInit() {
    this.bookService.getBooks();
    this.subscription = this.bookService.bookListChangedEvent
    .subscribe(
      (books: Book[]) => {
        this.booksList = books;
      }
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
