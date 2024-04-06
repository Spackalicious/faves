import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Song } from './song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService implements OnInit {
  songSelectedEvent = new EventEmitter<Song>;
  songListChangedEvent = new Subject<Song[]>();

  private songs: Song[] = [];
  url = 'http://localhost:3000/songs';
  // url = 'https://faves-alpha.vercel.app/songs';
  // url = 'https://faves-server.onrender.com/songs';
  // private maxSongId: number = 0;  

  constructor(
    private http: HttpClient
  ) { 
    // this.maxSongId = this.getMaxId();
  }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.http.get(this.url)
    .subscribe({
      next: (songData: {message: string, songs: Song[]}) => {
        this.songs = songData.songs;
        // this.sortAndSend(this.songs);

        this.songs.sort((a, b) => {
          const nameA = a.artist.toUpperCase();
          const nameB = b.artist.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });

        let songListClone: Song[] = this.songs.slice();
        this.songListChangedEvent.next(songListClone);
        // console.log("THE SONG INFORMATION IS: ");
        // for (let song of songListClone) {
        //   console.log(song.id + " / " + song.title + " / " + song.artist + " / " + song.ytLink);
        //   console.log(song.comments);
        // }
      },
      error: (error) => {
        console.log('getSongs error: ' + error);
      }
    });
  }

  // getSong(id: string): Song {
  //   console.log("THIS SONG'S ID IS: " + id);
  //   console.log("THIS SONG'S INFO: " + this.songSelectedEvent.toString);
  //   return this.songs.find((d) => d.id === id);
  // }
  getSong(id: string) {
    // console.log("THIS SONG'S ID IS: " + id);
    // console.log("THIS SONG'S INFO: " + this.songSelectedEvent.toString);
    return this.songs.find((d) => d.id === id);
  }

  // getMaxId(): number {
  //     let maxId = 0;
  //     this.songs.forEach((d) => {
  //       if (+d.id > maxId) {
  //         maxId = +d.id;
  //         console.log('New Songs!!! MaxId is ' + maxId);
  //       }
  //     });
  //     return maxId;
  // }

  // sortAndSend(thing: Song[]) {
  // sortAndSend(thing: any) {
  //   // for(let song of thing) {

  //     let artistName = thing.artist;
  //     artistName.sort((a, b) => {
  //       const nameA = a.name.toUpperCase(); 
  //       const nameB = b.name.toUpperCase(); 
  //       if (nameA < nameB) {
  //         return -1;
  //       }
  //       if (nameA > nameB) {
  //         return 1;
  //       }      
  //       return 0;
  //     });
  //   // }
  // }

  addSong(newSong: Song) {
    if (!newSong) {
      return;
    }
    // console.log('The current MaxID (SONGS) is: ' + this.maxSongId);
    // newSong.id = String(++this.maxSongId);
    newSong.id = '';
    // console.log('The new MaxID (SONGS) is: ' + this.maxSongId);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{
      message: string, 
      song: Song
    }>(this.url, newSong,
      { headers: headers })
      .subscribe (
        (responseData) => {
          this.songs.push(responseData.song);
        }
      );
      location.assign('http://localhost:4200/songs');
      // location.assign('https://juliefaves.netlify.app/songs');
  }

  updateSong(originalSong: Song, newSong: Song) {
    if (!originalSong || !newSong) {
      return;
    }
    const pos = this.songs.findIndex(d => d.id === originalSong.id);
    if ( pos < 0 ) {
      return;
    }
    newSong.id = originalSong.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(this.url + "/" + originalSong.id,
    newSong, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.songs[pos] = newSong;
      }
    );
    location.assign('http://localhost:4200/songs');
    // location.assign('https://juliefaves.netlify.app/songs');
  }

  deleteSong(song: Song) {
    if (!song) {
      return;
    }
    const pos = this.songs.indexOf(song);
    console.log("the song POS to be deleted is: " + pos);
    if (pos < 0) {
      return;
    }
    this.http.delete(this.url + "/" + song.id)
    .subscribe(
      (response: Response) => {
        this.songs.splice(pos, 1);
      }
    );
    location.assign('http://localhost:4200/songs');
    // location.assign('https://juliefaves.netlify.app/songs');
  }

}
