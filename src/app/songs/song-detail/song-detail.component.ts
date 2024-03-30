import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Song } from '../song.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.css'
})
export class SongDetailComponent implements OnInit {
  song: Song;
  id: string;

  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.song = this.songService.getSong(this.id);
      }
    );
  }

  onDelete() {
    this.songService.deleteSong(this.song);
    // this.router.navigateByUrl('songs');
    this.router.navigate(['songs']);
  }
}
