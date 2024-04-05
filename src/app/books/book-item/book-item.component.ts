import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
// import { AuthorService } from '../../authors/author.service';
// import { Author } from '../../authors/author.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent implements OnInit {
@Input() book: Book;
@Input() id: string;
// @Input() author: Author;

  // bookAuthor: string = '';
  // authorInfo: string;
  // author: Author;

constructor( 
  // private authorService: AuthorService, 
  private bookService: BookService
) { }

ngOnInit() {
  // const author: Author = this.authorService.getAuthor(this.book.author);
  // this.bookAuthor = author.name;
  // console.log(JSON.stringify(author));

  // this.authorInfo = JSON.stringify(this.book.author);
  // const authInfoArray = this.authorInfo.split('"');
  // const wordName = authInfoArray.indexOf("name");
  // // console.log("The word Name is at spot: " + wordName);
  // const authSpot = wordName + 2;
  // // console.log("The author is at location: " + authSpot);
  // this.bookAuthor = authInfoArray[authSpot];


        // this.book = this.bookService.getBook(this.id);
        // this.authorInfo = JSON.stringify(this.book.author);
        // const authInfoArray = this.authorInfo.split('"');
        // console.log(authInfoArray);
        // const wordName = authInfoArray.indexOf("name");
        // console.log("The word Name is at spot: " + wordName);
        // const authSpot = wordName + 2;
        // console.log("The author is at location: " + authSpot);
        // this.bookAuthor = authInfoArray[authSpot];


        // this.bookAuthor = authInfoArray[11];
        // this.bookAuthor = this.bookService.getAuthor(this.book);

}
}
