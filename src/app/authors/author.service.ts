import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Author } from './author.model';


@Injectable({
  providedIn: 'root'
})
export class AuthorService implements OnInit {
  authorSelectedEvent = new EventEmitter<Author>;
  authorListChangedEvent = new Subject<Author[]>();

  private authors: Author[] = [];
  url = 'http://localhost:3000/authors';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): Author[] {
    this.http.get(this.url, {responseType: 'json'})
    .subscribe({
      // next: (authorData: {message: string, authors: Author[]}) => {
      next: (authorData: {message: string, authors: Author[]}) => {
        this.authors = authorData.authors;
        // this.sortAndSend(this.authors);

        let authorListClone: Author[] = this.authors.slice();
        this.authorListChangedEvent.next(authorListClone);
        // console.log("THE AUTHOR INFO IS: ");
        // for (let author of authorListClone) {
        //   console.log(author.id + " / " + author.title + " / " + author.author + " / " + author.genre);
        // }
      },
      error: (error) => {
        console.log('The getAuthors ERROR says ' + error.message.toString());
      }
    });
    return this.authors.slice();
  }

  getAuthor(id: string) {
    return this.authors.find((d) => d.id === id);
  }

  getAuthorName(author: Author) {
    return author.name;
  }

  addAuthor(newAuthor: Author) {
    if (!newAuthor) {
      return;
    }
    newAuthor.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{
      message: string, 
      author: Author
    }>(this.url, newAuthor,
      { headers: headers })
      .subscribe (
        (responseData) => {
          this.authors.push(responseData.author);
        }
      );
      location.assign('http://localhost:4200/authors');
  }

  updateAuthor(originalAuthor: Author, newAuthor: Author) {
    if (!originalAuthor || !newAuthor) {
      return;
    }
    const pos = this.authors.findIndex(d => d.id === originalAuthor.id);
    if ( pos < 0 ) {
      return;
    }
    newAuthor.id = originalAuthor.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(this.url + "/" + originalAuthor.id,
    newAuthor, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.authors[pos] = newAuthor;
      }
    );
    location.assign('http://localhost:4200/authors');
  }

  deleteAuthor(author: Author) {
    if (!author) {
      return;
    }
    const pos = this.authors.indexOf(author);
    console.log("the author POS to be deleted is: " + pos);
    if (pos < 0) {
      return;
    }
    this.http.delete(this.url + "/" + author.id)
    .subscribe(
      (response: Response) => {
        this.authors.splice(pos, 1);
      }
    );
    location.assign('http://localhost:4200/authors');
  }

}
