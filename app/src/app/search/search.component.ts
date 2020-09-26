import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SearchService } from './../services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { ArtistDetailsComponent } from '../artist-details/artist-details.component';
import { TrackDetailsComponent } from './../track-details/track-details.component';

interface SearchDetails {
  data: any[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  radius: 300;
  color: 'lightgray';
  searchForm: FormGroup;
  formSubmitted = false;
  panelOpenState = false;
  hideMessage: boolean;
  loading: boolean;

  inputField: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(40),
  ]);
  chooseParams: FormControl = new FormControl();
  searchResults = [];
  artistResults = [];

  constructor(public searchService: SearchService, public dialog: MatDialog) {}

  openDialogArtist(artist, searchParams): void {
    this.dialog.open(ArtistDetailsComponent, {
      data: { artist, searchParams },
      autoFocus: false,
      maxWidth: '50%',
    });
    console.log(artist);
    console.log(searchParams);
  }

  openDialogSong(songTitle, artistName, searchParams, previewLink): void {
    this.dialog.open(TrackDetailsComponent, {
      data: { songTitle, artistName, searchParams, previewLink },
      autoFocus: false,
      maxWidth: '50%',
    });
    console.log(songTitle);
    console.log(artistName);
    console.log(searchParams);
    console.log(previewLink);
  }

  onSearchChange(ob) {
    //TODO: Hide 'No Results' message when mat select is changed
    this.searchResults = [];
    this.formSubmitted = false;
    this.hideMessage = true;
    console.log(this.hideMessage);
  }

  getErrorMessage() {
    if (this.inputField.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.inputField.hasError('maxLength')) {
      return 'Only 40 chars allowed';
    }
  }

  //Clean up search input to prevent errors
  sanitizeString(str) {
    str = str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    return str.trim();
    // return (str = encodeURI(str));
  }

  onSubmit() {
    this.loading = true;

    if (
      this.chooseParams.value === 'song' &&
      this.inputField.valid &&
      this.chooseParams.valid
    ) {
      this.searchService
        .fetchData(
          this.sanitizeString(this.inputField.value),
          this.chooseParams.value
        )
        .subscribe((data: SearchDetails) => {
          console.log(data);
          this.loading = false;
          this.searchResults = data.data;
          this.formSubmitted = true;
        });
    }
    if (
      this.chooseParams.value === 'artist' &&
      this.inputField.valid &&
      this.chooseParams.valid
    ) {
      this.searchService
        .fetchData(
          this.sanitizeString(this.inputField.value),
          this.chooseParams.value
        )
        .subscribe((data: SearchDetails) => {
          console.log(data);
          this.loading = false;
          this.searchResults = data.data;
          this.formSubmitted = true;
        });
    }
  }

  openURL(url) {
    window.open(url, '_blank');
  }

  ngOnInit() {}
}
