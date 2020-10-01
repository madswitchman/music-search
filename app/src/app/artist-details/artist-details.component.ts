import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtistBioComponent } from './../artist-bio/artist-bio.component';
import { ArtistTopTracksComponent } from './../artist-top-tracks/artist-top-tracks.component';
import { SearchService } from './../services/search.service';

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
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ArtistDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  openDialogBio(strBio: string): void {
    this.dialog.open(ArtistBioComponent, {
      data: { strBio },
      autoFocus: false,
      maxHeight: '70vh',
      maxWidth: '50vw',
    });
  }

  openDialogTopTracks(idArtist: number) {
    this.dialog.open(ArtistTopTracksComponent, {
      data: { idArtist },
      autoFocus: false,
      maxHeight: '78vh',
      width: '50vw',
    });
    console.log(idArtist);
  }

  toggleEllipsis() {
    document.querySelector('#ellipsis-ex').classList.toggle('text-truncate');
  }

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
          //console.log(artistData);
        });
    }
  }
}
