import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchService } from './../services/search.service';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss'],
})
export class TrackDetailsComponent implements OnInit {
  inputField: string;
  artistResults = [];
  loading: boolean;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = true;

  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: this.data.songTitle,
      link: this.data.previewLink,
    },
  ];

  constructor(
    public searchService: SearchService,
    public dialogRef: MatDialogRef<TrackDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.searchParams === 'artist') {
      this.loading = true;
      this.searchService
        .fetchArtistDetails(this.data.artist)
        .subscribe((artistData) => {
          this.loading = false;
          this.artistResults = artistData.artists;
          console.log(artistData);
        });
    }
    if (this.data.searchParams === 'song') {
      console.log(this.data.artistName);
      this.loading = true;
      this.searchService
        .fetchSongDetails(this.data.artistName, this.data.songTitle)
        .subscribe((artistData) => {
          this.loading = false;
          this.artistResults = artistData.track;
          console.log(artistData);
        });
    }
  }
}
