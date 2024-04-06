import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: string;

  constructor(
    private bookService: BookService, 
    private route: ActivatedRoute,
    private router: Router, 
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.book = this.bookService.getBook(this.id);
      }
      );      
  }

  onDelete() {
    this.bookService.deleteBook(this.book);
    this.router.navigate(['books']);  }

}
