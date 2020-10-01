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
