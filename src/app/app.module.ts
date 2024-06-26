import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SongsComponent } from './songs/songs.component';
import { SongEditComponent } from './songs/song-edit/song-edit.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { SongItemComponent } from './songs/song-item/song-item.component';

import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookItemComponent } from './books/book-item/book-item.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

import { HeaderComponent } from './header/header.component';
import { LoginButtonComponent } from './login-button/login-button.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongEditComponent,
    SongListComponent,
    SongDetailComponent,
    SongItemComponent,
    BooksComponent,
    BookListComponent,
    BookItemComponent,
    BookEditComponent,
    BookDetailComponent, 
    HeaderComponent, 
    LoginButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, 
    YouTubePlayerModule, 
    AuthModule.forRoot({
      ... env.auth,
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
