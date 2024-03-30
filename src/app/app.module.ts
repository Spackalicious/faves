import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SongsComponent } from './songs/songs.component';
import { SongEditComponent } from './songs/song-edit/song-edit.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { SongItemComponent } from './songs/song-item/song-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SongsComponent,
    SongEditComponent,
    SongListComponent,
    SongDetailComponent,
    SongItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
