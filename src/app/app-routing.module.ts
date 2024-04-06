import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongsComponent } from './songs/songs.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { SongEditComponent } from './songs/song-edit/song-edit.component';

import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' }, 
  { path: 'songs', component: SongsComponent, children: [
    { path: 'new', component: SongEditComponent, data: { message: 'Create New Song Entry Here'} },
    { path: ':id', component: SongDetailComponent }, 
    { path: ':id/edit', component: SongEditComponent }
  ] },
  { path: 'books', component: BooksComponent, children: [
    { path: 'new', component: BookEditComponent, data: { message: 'Create New Book Entry Here'} },
    { path: ':id', component: BookDetailComponent }, 
    { path: ':id/edit', component: BookEditComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
