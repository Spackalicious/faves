import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../song.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent implements OnInit, OnDestroy {
songsList : Song[] = [];
subscription: Subscription;

constructor(
  private songService: SongService
) { }

ngOnInit() {
  this.songService.getSongs();
  this.subscription = this.songService.songListChangedEvent
  .subscribe(
    (songs: Song[]) => {
      this.songsList = songs;
    }
  );
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}
