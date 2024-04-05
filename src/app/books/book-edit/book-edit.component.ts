import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { Author } from '../../authors/author.model';
import { AuthorService } from '../../authors/author.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  originalBook: Book;
  book: Book;
  editMode: boolean = false;

  bookAuthor: string = '';
  author: Author;
  authorInfo: string;
  authorList: Author[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authorService: AuthorService
  ) { }

  ngOnInit() {
    this.route.params.subscribe (
      (params: Params) => {
        let id = params['id'];
        if (id === undefined || id === null) {
          this.editMode = false;
          return;
        }
        this.originalBook = this.bookService.getBook(id);
        if ( this.originalBook === undefined || this.originalBook === null ) {
          return;
        }
        this.editMode = true;
        this.book = JSON.parse(JSON.stringify(this.originalBook));
        this.authorInfo = JSON.stringify(this.book.author);
        const authInfoArray = this.authorInfo.split('"');
        console.log(authInfoArray);
        const wordName = authInfoArray.indexOf("name");
        console.log("The word Name is at spot: " + wordName);
        const authSpot = wordName + 2;
        console.log("The author is at location: " + authSpot);
        this.bookAuthor = authInfoArray[authSpot];
      });
      this.authorList = this.authorService.getAuthors();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmitBook(form: NgForm) {
    let value = form.value;
    let newBook = new Book(
      null, value.title, value.author, value.genre, value.imgURL, value.myReview);
      if (this.editMode) {
        this.bookService.updateBook(this.originalBook, newBook);
      } else {
        this.bookService.addBook(newBook);
      }
    this.onCancel();
  }
}
