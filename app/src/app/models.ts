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
  tracks: TrackData[];
}

export interface TrackData {
  artistName: string;
  albumCover: string;
  songTitle: string;
}
