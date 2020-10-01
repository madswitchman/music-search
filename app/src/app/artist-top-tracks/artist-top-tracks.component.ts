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
  loading: boolean;
  trackResults = [];
  playlistResults = [];

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [5];
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = true;

  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [];

  constructor(
    public searchService: SearchService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ArtistTopTracksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loading = true;
    this.searchService
      .fetchArtistTopTracks(this.data.idArtist)
      .subscribe((topTracks) => {
        this.loading = false;
        this.trackResults = topTracks.data;
        for (let item in this.trackResults) {
          this.msaapPlaylist.push({
            title: this.trackResults[item].title,
            link: this.trackResults[item].preview,
          });
        }
        //console.log(this.msaapPlaylist);
      });
  }
}
