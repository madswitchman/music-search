import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SearchService } from './../services/search.service';

interface ArtistDetails {
  artists: any[];
}

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent implements OnInit {
  inputField: string;
  artistResults = [];
  loading: boolean;

  constructor(
    public searchService: SearchService,
    public dialogRef: MatDialogRef<ArtistDetailsComponent>,
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
        .subscribe((artistData: ArtistDetails) => {
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
        .subscribe((artistData: ArtistDetails) => {
          this.loading = false;
          this.artistResults = artistData.artists;
          console.log(artistData);
        });
    }
  }
}
