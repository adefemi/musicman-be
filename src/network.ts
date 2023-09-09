const DEEZER_API = "https://api.deezer.com";

export const getSearchUrl = (q: string): string => {
  return DEEZER_API + `/search?q=track:"${q}"`;
};

export const getArtistUrl = (id: string): string => {
  return DEEZER_API + `/artist/${id}`;
};

export const getAlbumUrl = (id: string): string => {
  return DEEZER_API + `/album/${id}`;
};
