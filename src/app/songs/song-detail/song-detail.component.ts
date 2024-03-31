import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Song } from '../song.model';
import { SongService } from '../song.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgForm } from '@angular/forms';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.css'
})
export class SongDetailComponent implements OnInit {
  song: Song;
  id: string;
  // safeURL: SafeResourceUrl;
  // videoURL: string;
  // I want to ALWAYS load a new YouTube video with each song change. So skip this!
  // apiLoaded = false;
  @Input() videoId: string;

  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router, 
    // private sanitizer: DomSanitizer, 
  ) { 
  }
  
  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.song = this.songService.getSong(this.id);
        // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
        // if (!this.apiLoaded) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          document.body.appendChild(tag);
          // this.apiLoaded = true;
          this.videoId = this.song.ytLink;
        // }
      }
      );
  }

  onDelete() {
    this.songService.deleteSong(this.song);
    // this.router.navigateByUrl('songs');
    this.router.navigate(['songs']);
  }

  onSubmitComment(form: NgForm) {
    let newComment = form.value;
    let commentsArray = this.song.comments;
    commentsArray.push(newComment);
    // console.log(this.song.comments);
    let newSong = new Song(
      this.song.id, this.song.title, this.song.artist, this.song.ytLink, commentsArray
    );
    this.songService.updateSong(this.song, newSong);

  }
}
