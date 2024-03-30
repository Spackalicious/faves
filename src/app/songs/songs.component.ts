import { Component, OnInit } from '@angular/core';
import { Song } from './song.model';
import { SongService } from './song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})
export class SongsComponent implements OnInit {
  selectedSong: Song;

  constructor(
    private songService: SongService
  ) { }

  ngOnInit() {
    this.songService.songSelectedEvent
    .subscribe(
      (song: Song) => {
        this.selectedSong = song
      }
    );
  }
}
