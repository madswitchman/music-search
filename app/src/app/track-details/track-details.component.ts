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
  trackResults = [];
  loading: boolean;
  //Audio Player params
  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = false;

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
    if (this.data.searchParams === 'song') {
      console.log(this.data.artistName);
      this.loading = true;
      this.searchService
        .fetchSongDetails(this.data.artistName, this.data.songTitle)
        .subscribe((trackData) => {
          this.loading = false;
          this.trackResults = trackData.track;
          //console.log(trackData);
        });
    }
  }
}
