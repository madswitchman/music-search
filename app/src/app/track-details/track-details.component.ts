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
  isLoading: boolean;

  //ngx-audio-player params
  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = false;

  //Define playlist so it is recognizable to ngx-audio-player
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

  //Close Dialog Window
  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.isLoading = true;
    //Calls service to search for Song metadata
    //Queries on artist name and song title
    this.searchService
      .fetchSongDetails(this.data.artistName, this.data.songTitle)
      .subscribe(
        (trackData) => {
          //response received - stop loading bar
          this.isLoading = false;
          this.trackResults = trackData.track;
        },
        //close Dialog window on error
        (error) => {
          this.isLoading = false;
          this.onCloseClick();
        }
      );
  }
}
