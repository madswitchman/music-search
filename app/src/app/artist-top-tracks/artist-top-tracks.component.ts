import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchService } from './../services/search.service';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-artist-top-tracks',
  templateUrl: './artist-top-tracks.component.html',
  styleUrls: ['./artist-top-tracks.component.scss'],
})
export class ArtistTopTracksComponent implements OnInit {
  isLoading: boolean;
  trackResults = [];
  message: string;

  //ngx-audio-player params
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [5];
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = true;
  msaapPlaylist: Track[] = [];

  constructor(
    public searchService: SearchService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ArtistTopTracksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //Close Dialog Window
  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.searchService
      //Calls service to search TopTracks based on Artist ID
      //Response Limit is defined in app.js
      .fetchArtistTopTracks(this.data.idArtist)
      .subscribe(
        (topTracks) => {
          this.isLoading = false;
          this.trackResults = topTracks.data;
          if (this.trackResults.length == 0) {
            this.message = 'No tracks found';
          }
          //Create an array so ngx-audio-player can recognize the playlist
          for (let item in this.trackResults) {
            this.msaapPlaylist.push({
              title: this.trackResults[item].title,
              link: this.trackResults[item].preview,
            });
          }
        },
        //close Dialog window on error
        (error) => {
          this.isLoading = false;
          this.onCloseClick();
        }
      );
  }
}
