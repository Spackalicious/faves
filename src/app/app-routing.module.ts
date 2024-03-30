import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './songs/songs.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { SongEditComponent } from './songs/song-edit/song-edit.component';
// import { MusicItemComponent } from './music/music-item/music-item.component';
// import { MusicListComponent } from './music/music-list/music-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' }, 
  { path: 'songs', component: SongsComponent, children: [
    { path: 'new', component: SongEditComponent, data: { message: 'Create New Song Entry Here'} },
    { path: ':id', component: SongDetailComponent }, 
    { path: ':id/edit', component: SongEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
