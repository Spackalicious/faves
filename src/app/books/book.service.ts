import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Book } from './book.model';
// import { Author } from '../authors/author.model';
// import { AuthorService } from '../authors/author.service';

@Injectable({
  providedIn: 'root'
})
export class BookService implements OnInit {
  bookSelectedEvent = new EventEmitter<Book>;
  bookListChangedEvent = new Subject<Book[]>();

  private books: Book[] = [];
  // url = 'http://localhost:3000/books';
  url = 'https://faves-server.onrender.com/books';

  constructor(
    private http: HttpClient,
    // private authorService: AuthorService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.http.get(this.url, {responseType: 'json'})
    .subscribe({
      // next: (bookData: {message: string, books: Book[]}) => {
      next: (bookData: {message: string, books: Book[]}) => {
        this.books = bookData.books;
        // this.sortAndSend(this.books);

        this.books.sort((a, b) => {
          const nameA = a.author.toUpperCase();
          const nameB = b.author.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        let bookListClone: Book[] = this.books.slice();
        this.bookListChangedEvent.next(bookListClone);
        // console.log("THE BOOK INFO IS: ");
        // for (let book of bookListClone) {
        //   console.log(book.id + " / " + book.title + " / " + book.author + " / " + book.genre);
        // }
      },
      error: (error) => {
        console.log('The getBooks ERROR says ' + error.message.toString());
      }
    });
  }

  getBook(id: string) {
    return this.books.find((d) => d.id === id);
  }

  // getAuthor(id: string) {
  //       const book = this.getBook(id);
  //       // const author: Author = book.author;
  //       const authorInfo = JSON.stringify(book.author);
  //       const authInfoArray = authorInfo.split('"');
  //       console.log(authInfoArray);
  //       const wordName = authInfoArray.indexOf("name");
  //       console.log("The word Name is at spot: " + wordName);
  //       const authSpot = wordName + 2;
  //       console.log("The author is at location: " + authSpot);
  //       const bookAuthor = authInfoArray[authSpot];
  //       return bookAuthor;
  // }

  addBook(newBook: Book) {
    if (!newBook) {
      return;
    }
    newBook.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{
      message: string, 
      book: Book
    }>(this.url, newBook,
      { headers: headers })
      .subscribe (
        (responseData) => {
          this.books.push(responseData.book);
        }
      );
      // location.assign('http://localhost:4200/books');
      location.assign('https://juliefaves.netlify.app/books');
  }

  updateBook(originalBook: Book, newBook: Book) {
    if (!originalBook || !newBook) {
      return;
    }
    const pos = this.books.findIndex(d => d.id === originalBook.id);
    if ( pos < 0 ) {
      return;
    }
    newBook.id = originalBook.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(this.url + "/" + originalBook.id,
    newBook, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.books[pos] = newBook;
      }
    );
    // location.assign('http://localhost:4200/books');
    location.assign('https://juliefaves.netlify.app/books');
  }

  deleteBook(book: Book) {
    if (!book) {
      return;
    }
    const pos = this.books.indexOf(book);
    console.log("the book POS to be deleted is: " + pos);
    if (pos < 0) {
      return;
    }
    this.http.delete(this.url + "/" + book.id)
    .subscribe(
      (response: Response) => {
        this.books.splice(pos, 1);
      }
    );
    // location.assign('http://localhost:4200/books');
    location.assign('https://juliefaves.netlify.app/books');
  }

}
