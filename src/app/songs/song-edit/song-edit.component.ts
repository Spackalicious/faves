import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Song } from '../song.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrl: './song-edit.component.css'
})
export class SongEditComponent implements OnInit {
  originalSong: Song;
  song: Song;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private songService: SongService
              )  { }

  ngOnInit() {
    this.route.params.subscribe (
      (params: Params) => {
        let id = params['id'];
        if (id === undefined || id === null) {
          this.editMode = false;
          return;
        }
        this.originalSong = this.songService.getSong(id);
        if ( this.originalSong === undefined || this.originalSong === null ) {
          return;
        }
        this.editMode = true;
        this.song = JSON.parse(JSON.stringify(this.originalSong));
      });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newSong = new Song(
      null, value.title, value.artist, value.ytLink);
      if (this.editMode) {
        this.songService.updateSong(this.originalSong, newSong);
      } else {
        this.songService.addSong(newSong);
      }
    this.onCancel();
  }
}
