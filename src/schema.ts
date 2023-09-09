export type TrackArtist = {
  id: number;
  name: string;
  link: string;
  picture_medium: string;
  tracklist: string;
};

export const getMyTrackArtist = (artist: TrackArtist): TrackArtist => {
  return {
    id: artist.id,
    name: artist.name,
    link: artist.link,
    picture_medium: artist.picture_medium,
    tracklist: artist.tracklist,
  };
};

export type TrackAlbum = {
  id: number;
  title: string;
  cover_medium: string;
  tracklist: string;
  nb_tracks?: number;
  release_date?: string;
};

export const getMyTrackAlbum = (album: TrackAlbum): TrackAlbum => {
  return {
    id: album.id,
    title: album.title,
    cover_medium: album.cover_medium,
    tracklist: album.tracklist,
    nb_tracks: album.nb_tracks,
    release_date: album.release_date,
  };
};

export type Track = {
  id: number;
  title: string;
  link: string;
  duration: number;
  rank: number;
  preview: string;
};

export const getMyTrack = (track: Track): Track => {
  return {
    id: track.id,
    title: track.title,
    link: track.link,
    duration: track.duration,
    rank: track.rank,
    preview: track.preview,
  };
};

export type TrackWithArtistAndAlbum = Track & {
  artist: TrackArtist;
  album: TrackAlbum;
};

export const getMyTrackWithArtistAndAlbum = (
  track: TrackWithArtistAndAlbum
): TrackWithArtistAndAlbum => {
  const trackObj = getMyTrack(track);

  return {
    ...trackObj,
    artist: getMyTrackArtist(track.artist),
    album: getMyTrackAlbum(track.album),
  };
};

export type TrackObject = {
  data: TrackWithArtistAndAlbum[];
  total: number;
  next: string;
  prev: string;
};

export const getMyTrackObject = (track: TrackObject): TrackObject => {
  const trackObj: TrackWithArtistAndAlbum[] = [];

  for (let i of track.data) {
    trackObj.push(getMyTrackWithArtistAndAlbum(i));
  }

  return {
    ...track,
    data: trackObj,
  };
};

export type Artist = TrackArtist & {
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  topTracks?: Track[];
  topAlbums?: TrackAlbum[];
};

export const getMyArtist = (track: Artist): Artist => {
  const trackArtist = getMyTrackArtist(track);

  return {
    ...trackArtist,
    nb_album: track.nb_album,
    nb_fan: track.nb_fan,
    radio: track.radio,
  };
};
