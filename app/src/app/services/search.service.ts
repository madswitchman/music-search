import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs';
import { ArtistResponse, TrackResponse } from './../models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private API_ENDPOINT: string;
  constructor(private httpClient: HttpClient) {}

  //Trims artist length name for friendly rendering
  public trimString(stringToTrim: string) {
    var length = 20;
    var trimmedString =
      stringToTrim.length > length
        ? stringToTrim.substring(0, length - 3) + '...'
        : stringToTrim;
    return trimmedString;
  }

  // public wordWrap(str) {
  //   var brk = brk || 'n';
  //   var width = width || 32;
  //   var cut = cut || false;

  //   if (!str) {
  //     return str;
  //   }

  //   var regex =
  //     '.{1,' + width + '}(s|$)' + (cut ? '|.{' + width + '}|.+$' : '|S+?(s|$)');

  //   return str.match(RegExp(regex, 'g')).join(brk);
  // }

  public fetchData(
    searchString: string,
    chooseParams: string
  ): Observable<any> {
    if (chooseParams === 'artist') {
      this.API_ENDPOINT = 'http://localhost:3000/searchArtist';
    }
    if (chooseParams === 'song') {
      this.API_ENDPOINT = 'http://localhost:3000/searchSong';
    }
    const opts = {
      params: new HttpParams({ fromString: 'q=' + searchString }),
    };
    return this.httpClient
      .get(this.API_ENDPOINT, opts)
      .pipe(catchError(this.errorHandler));
  }
  public fetchArtistDetails(artist: string): Observable<ArtistResponse> {
    this.API_ENDPOINT = 'http://localhost:3000/artistDetails';
    const opts = {
      params: new HttpParams({ fromString: 'q=' + artist }),
    };
    return this.httpClient
      .get<ArtistResponse>(this.API_ENDPOINT, opts)
      .pipe(catchError(this.errorHandler));
  }
  public fetchSongDetails(
    artist: string,
    songTitle: string
  ): Observable<TrackResponse> {
    this.API_ENDPOINT = 'http://localhost:3000/songDetails';
    const opts = {
      params: new HttpParams({ fromString: 'q=' + artist + '&t=' + songTitle }),
    };
    return this.httpClient
      .get<TrackResponse>(this.API_ENDPOINT, opts)
      .pipe(catchError(this.errorHandler));
  }
  //Handle any HTTP errors - user sees dialog
  //NOTE: Won't return 'real' error codes while on localhost
  private errorHandler(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = `Error Code: ${error.status}\nMessage: Request could not be completed.`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
