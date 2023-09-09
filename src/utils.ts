import axios, { AxiosError } from "axios";
import {
  Track,
  TrackAlbum,
  TrackWithArtistAndAlbum,
  getMyTrack,
  getMyTrackAlbum,
} from "./schema";
import { getAlbumUrl } from "./network";

export const extractTopTracksAndAlbums = (
  obj: TrackWithArtistAndAlbum[]
): { topTracks: Track[]; topAlbums: TrackAlbum[] } => {
  const a: Track[] = [];
  const b: TrackAlbum[] = [];
  for (let i of obj) {
    b.push(getMyTrackAlbum(i.album));
    delete i.album;
    a.push(getMyTrack(i));
  }
  return { topTracks: a, topAlbums: b };
};

export const getFullAlbumInfo = async (
  albums: TrackAlbum[]
): Promise<{ albums: TrackAlbum[]; error: AxiosError }> => {
  const promiseList = [];
  for (let album of albums) {
    promiseList.push(axios.get<TrackAlbum>(getAlbumUrl(album.id.toString())));
  }
  let error: AxiosError | null = null;
  const results = await Promise.all(promiseList).catch((e) => {
    error = e;
  });
  if (results) {
    const finalAlbums: TrackAlbum[] = [];
    for (let result of results) {
      finalAlbums.push(getMyTrackAlbum(result.data as TrackAlbum));
    }
    return { albums: finalAlbums, error };
  }
  return { albums: [], error };
};