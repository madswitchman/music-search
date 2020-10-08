import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SearchService } from './../services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { ArtistDetailsComponent } from '../artist-details/artist-details.component';
import { TrackDetailsComponent } from './../track-details/track-details.component';

//Model to catch API response
//This is generic - Artist OR Track
interface SearchDetails {
  data: any[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  formSubmitted = false;
  isLoading: boolean;
  chooseParams: FormControl = new FormControl();
  searchResults = [];
  message: string;

  inputField: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(40),
  ]);

  constructor(public searchService: SearchService, public dialog: MatDialog) {}

  //Opens Track Details dialog and passes data for rendering
  //artist - artist name
  //searchParams - Artist or Song
  //previewLink - URL to Song Clip
  //artistId - Id from Deezer API
  openDialogArtist(
    artist: string,
    searchParams: string,
    artistId: number
  ): void {
    this.dialog.open(ArtistDetailsComponent, {
      data: { artist, searchParams, artistId },
      autoFocus: false,
      maxWidth: '50%',
    });
  }

  //Opens Track Details dialog and passes data for rendering
  //searchParams - Artist or Song
  //previewLink - URL to Song Clip
  openDialogSong(
    songTitle: string,
    artistName: string,
    albumName: string,
    searchParams: string,
    previewLink: string
  ): void {
    this.dialog.open(TrackDetailsComponent, {
      data: { songTitle, artistName, albumName, searchParams, previewLink },
      autoFocus: false,
      maxWidth: '50%',
    });
  }

  onSearchChange($event): void {
    //Empty model to clear state (clears search result cards)
    this.searchResults = [];
    //Clear any feedback messages
    this.message = '';
  }

  //Custom validation method for search form
  getErrorMessage() {
    if (this.inputField.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.inputField.hasError('maxLength')) {
      return 'Only 40 chars allowed';
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    //Reset results message
    this.message = '';
    if (this.inputField.valid && this.chooseParams.valid) {
      //Calls service to search for generic Artist/Track
      //chooseParams.value indicates artist or song
      this.searchService
        .fetchData(
          //this.sanitizeString(this.inputField.value),
          this.inputField.value,
          this.chooseParams.value
        )
        .subscribe(
          (data: SearchDetails) => {
            this.searchResults = data.data;
            this.formSubmitted = true;
            if (this.searchResults.length == 0) {
              this.message = 'No Results';
            }
            //response received - stop loading bar
            this.isLoading = false;
          },
          //stop loading bar if error occurs
          (error) => {
            this.isLoading = false;
          }
        );
    }
    this.formSubmitted = false;
  }
  //Method to open external links
  openURL(url): void {
    window.open(url, '_blank');
  }

  ngOnInit() {}
}
