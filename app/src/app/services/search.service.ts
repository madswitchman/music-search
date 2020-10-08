import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ArtistResponse, TrackResponse } from './../models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private API_ENDPOINT: string;
  constructor(private httpClient: HttpClient) {}

  //Trims artist length name for friendly rendering
  //Replaces truncated bit with ellipsis
  public trimString(stringToTrim: string) {
    var length = 20;
    var trimmedString =
      stringToTrim.length > length
        ? stringToTrim.substring(0, length - 3) + '...'
        : stringToTrim;
    return trimmedString;
  }

  //Method for generic artist/song search
  public fetchData(
    searchString: string,
    chooseParams: string
  ): Observable<Object> {
    if (chooseParams === 'artist') {
      this.API_ENDPOINT = 'http://127.0.0.1:3000/searchArtist';
    }
    if (chooseParams === 'song') {
      this.API_ENDPOINT = 'http://127.0.0.1:3000/searchSong';
    }
    const opts = {
      params: new HttpParams({
        fromString: 'q=' + encodeURIComponent(searchString),
      }),
    };
    return this.httpClient
      .get(this.API_ENDPOINT, opts)
      .pipe(timeout(5000), catchError(this.errorHandler));
  }

  //Method to fetch Track details based on artist name
  public fetchArtistDetails(artist: string): Observable<ArtistResponse> {
    this.API_ENDPOINT = 'http://127.0.0.1:3000/artistDetails';
    const opts = {
      params: new HttpParams({ fromString: 'q=' + encodeURIComponent(artist) }),
    };
    return this.httpClient
      .get<ArtistResponse>(this.API_ENDPOINT, opts)
      .pipe(timeout(5000), catchError(this.errorHandler));
  }

  //Method to fetch Track details
  //Build query with artist name and song title
  public fetchSongDetails(
    artist: string,
    songTitle: string
  ): Observable<TrackResponse> {
    this.API_ENDPOINT = 'http://127.0.0.1:3000/songDetails';
    const opts = {
      params: new HttpParams({
        fromString:
          'q=' +
          encodeURIComponent(artist) +
          '&t=' +
          encodeURIComponent(songTitle),
      }),
    };
    return this.httpClient
      .get<TrackResponse>(this.API_ENDPOINT, opts)
      .pipe(timeout(5000), catchError(this.errorHandler));
  }

  //Method to fetch Top Tracks with Deezer API artistId
  public fetchArtistTopTracks(artistId: number): Observable<any> {
    this.API_ENDPOINT = 'http://127.0.0.1:3000/artistTopTracks';
    const opts = {
      params: new HttpParams({ fromString: 'q=' + artistId }),
    };
    return this.httpClient
      .get(this.API_ENDPOINT, opts)
      .pipe(timeout(5000), catchError(this.errorHandler));
  }

  //Handle any HTTP errors - user sees dialog
  //NOTE: Won't return 'real' error codes while on localhost
  private errorHandler(error: HttpErrorResponse) {
    let errorMessage = 'Error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = `Error Code: ${error.status}\nMessage: Request could not be completed. Please try again`;
    }
    window.alert(errorMessage);
    return throwError(error);
  }
}
