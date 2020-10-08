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
  isLoading: boolean;

  constructor(
    public searchService: SearchService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ArtistDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //Opens Bio Dialog
  //Bio is already available from fetchArtist Details
  //so simply pass strBio to component
  openDialogBio(strBio: string): void {
    this.dialog.open(ArtistBioComponent, {
      data: { strBio },
      autoFocus: false,
      maxHeight: '70vh',
      maxWidth: '50vw',
    });
  }

  //Opens Top Tracks Dialog
  //Passes Deezer API Artist Id
  openDialogTopTracks(idArtist: number) {
    this.dialog.open(ArtistTopTracksComponent, {
      data: { idArtist },
      autoFocus: false,
      maxHeight: '78vh',
      width: '50vw',
    });
  }

  //Close Dialog Window
  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.isLoading = true;
    //Calls service to search for Artist metadata
    //Queries on artist name
    this.searchService.fetchArtistDetails(this.data.artist).subscribe(
      (artistData) => {
        //response received - stop loading bar
        this.isLoading = false;
        this.artistResults = artistData.artists;
      },
      //close Dialog window on error
      (error) => {
        this.isLoading = false;
        this.onCloseClick();
      }
    );
  }
}
