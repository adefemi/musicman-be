export const track1 = {
  id: 138545995,
  title: "Hello",
  link: "https://www.deezer.com/track/138545995",
  duration: 295,
  rank: 849020,
  preview:
    "https://cdns-preview-c.dzcdn.net/stream/c-cf968741c42b47400aca81b6da437a03-3.mp3",
};

export const artist = {
  id: 75798,
  name: "Adele",
  link: "https://www.deezer.com/artist/75798",
  picture_medium: "https://api.deezer.com/artist/75798/image",
  tracklist: "https://api.deezer.com/artist/75798/top?limit=50",
};

export const trackArtist1 = {
  ...track1,
  artist,
};

export const album1 = {
  id: 14880539,
  title: "25",
  nb_tracks: undefined,
  release_date: undefined,
  cover_medium: "https://api.deezer.com/album/14880539/image",
  tracklist: "https://api.deezer.com/album/14880539/tracks",
};

export const track2 = {
  id: 678569322,
  title: "Hello Brother",
  link: "https://www.deezer.com/track/678569322",
  duration: 170,
  rank: 410817,
  preview:
    "https://cdns-preview-b.dzcdn.net/stream/c-bea2a8493c71355e91c71f76b6030c67-3.mp3",
};

export const trackArtist2 = {
  ...track2,
  artist,
};

export const album2 = {
  id: 96604752,
  title: "Hello Brother",
  nb_tracks: undefined,
  release_date: undefined,
  cover_medium: "https://api.deezer.com/album/96604752/image",
  tracklist: "https://api.deezer.com/album/96604752/tracks",
};

export const album3 = {
  id: 96604752,
  title: "Hello Brother",
  cover_medium: "https://api.deezer.com/album/96604752/image",
  tracklist: "https://api.deezer.com/album/96604752/tracks",
};

export const trackObj = {
  data: [
    {
      ...track1,
      artist,
      album: album3,
    },
  ],
  total: 299,
  next: "hello world",
  prev: "",
};

export const artistMain = {
  tracklist: "https://api.deezer.com/artist/12345/top?limit=5",
  topTracks: undefined,
  topAlbums: undefined,
};


export const trackAlbumList = [
    {...album3},{...album3}
]