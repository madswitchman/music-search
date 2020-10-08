// These are the models to type check the
// data received from the API

export interface ArtistResponse {
  artists: ArtistData[];
}

export interface ArtistData {
  idArtist: number;
  strArtist: string;
  strGenre: string;
  strStyle: string;
  intFormedYear: number;
  strCountry: string;
  strBiographyEN: string;
}

export interface TrackResponse {
  track: TrackData[];
}

export interface TrackData {
  strArtist: string;
  strAlbum: string;
  strGenre: string;
  strStyle: string;
  strMusicVid: string;
}
