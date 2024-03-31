import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService implements OnInit {
  bookSelectedEvent = new EventEmitter<Book>;
  bookListChangedEvent = new Subject<Book[]>();

  private books: Book[] = [];
  url = 'http://localhost:3000/books';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.http.get(this.url)
    .subscribe({
      next: (bookData: {message: string, books: Book[]}) => {
        this.books = bookData.books;
        // this.sortAndSend(this.books);

        let bookListClone: Book[] = this.books.slice();
        this.bookListChangedEvent.next(bookListClone);
        console.log("THE BOOK INFO IS: ");
        for (let book of bookListClone) {
          console.log(book.id + " / " + book.title + " / " + book.author + " / " + book.genre);
        }
      },
      error: (error) => {
        console.log('getBooks ERROR says' + error.message.toString());
      }
    });
  }

  getBook(id: string) {
    return this.books.find((d) => d.id === id);
  }

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
      location.assign('http://localhost:4200/books');
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
    location.assign('http://localhost:4200/books');
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
    location.assign('http://localhost:4200/books');
  }

}
