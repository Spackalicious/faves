import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';
// import { AuthorService } from '../../authors/author.service';
// import { Author } from '../../authors/author.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: string;
  // bookAuthor: string = '';
  // author: Author;
  // authorInfo: string;

  constructor(
    private bookService: BookService, 
    private route: ActivatedRoute,
    private router: Router, 
    // private authorService: AuthorService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.book = this.bookService.getBook(this.id);
        // this.authorInfo = JSON.stringify(this.book.author);
        // const authInfoArray = this.authorInfo.split('"');
        // // console.log(authInfoArray);
        // const wordName = authInfoArray.indexOf("name");
        // // console.log("The word Name is at spot: " + wordName);
        // const authSpot = wordName + 2;
        // // console.log("The author is at location: " + authSpot);
        // this.bookAuthor = authInfoArray[authSpot];
        // this.bookAuthor = authInfoArray[11];
        // this.bookAuthor = this.bookService.getAuthor(this.book);
      }
      );
      // this.book = this.bookService.getBook(this.id); //--------------WORKS
      // this.authorInfo = JSON.stringify(this.book.author); //--------------WORKS
      // console.log(this.authorInfo);
      // const nameSpot = this.authorInfo.indexOf( "name" );
      // console.log("Location of Name: " + nameSpot); // 44
      // const authSpot = this.authorInfo.indexOf( "Roald" );
      // console.log("Location of Roald: " + authSpot); // 51
      // const authInfoArray = this.authorInfo.split('"'); //--------------WORKS
      // console.log(authInfoArray);
      // console.log(authInfoArray[11]);
      // this.bookAuthor = authInfoArray[11]; //--------------WORKS
      // this.author = JSON.parse(this.book.author);
      // console.log(this.author);
      // this.bookAuthor = this.authorService.getAuthorName(this.author);
      // console.log(this.bookAuthor);

      // console.log(this.book); //shows book json object
      // console.log("BOOK TITLE: ");
      // console.log(this.book.title); //works
      // console.log("AUTHOR: ");
      // console.log(this.book.author); // gives what seems to be a json object.
      // const authorText = new String(this.book.author); // says "object Object"
      // console.log("authorText: ");
      // console.log(authorText); // says "o" "b" "j"... 
      // console.log("Location of 'name': ");
      // let nameSpot = authorText.indexOf( "name" ); //says -1, because the string is object Object :/ 
      // console.log(nameSpot);



      // this.author = JSON.parse(authorText);
      // this.bookAuthor = this.author.name;
      // console.log("THIS AUTHOR'S NAME: ");
      // console.log(this.author.name);
      // this.author = this.authorService.getAuthor(this.book.author);
      // console.log(JSON.stringify(this.author)); //this shows undefined 
      // this.author = this.book.author; //can't assign type string to type Author!! even though console.log below shows json object I thought.
      // console.log(this.book.author);
      // this.bookAuthor = this.author.name;
      // console.log(this.book[3][2]);
  }

  onDelete() {
    this.bookService.deleteBook(this.book);
    this.router.navigate(['books']);
  }

}
