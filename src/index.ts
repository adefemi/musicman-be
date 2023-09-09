import express from "express";
import serverless from "serverless-http";
import axios from "axios";
import { getArtistUrl, getSearchUrl } from "./network";
import {
  TrackObject,
  Artist,
  TrackWithArtistAndAlbum,
  getMyTrackObject,
  getMyArtist,
} from "./schema";
import { extractTopTracksAndAlbums, getFullAlbumInfo } from "./utils";
import cors from 'cors'

const app = express();

app.use(cors({
  origin: '*',
}))

app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Hello Remotemore" });
});

// search track
app.get("/track", async (req, res) => {
  const { q } = req.query as { q: string };
  if (!q) {
    res.status(400).json({ error: "search params 'q' is required" });
    return;
  }
  const result = await axios.get<TrackObject>(getSearchUrl(q)).catch((e) => {
    res.status(500).json({ error: e.message });
    return;
  });

  if (result) {
    res.json({ result: getMyTrackObject(result.data) });
  }
});

// get artist
app.get("/artist/:id", async (req, res) => {
  const { id } = req.params as { id: string };

  const result = await axios.get<Artist>(getArtistUrl(id)).catch((e) => {
    res.status(500).json({ error: e.message });
    return;
  });

  if (result) {
    // using tracklist from artist, get the top track
    // update the limit to 5
    const artistObject = getMyArtist(result.data);
    const topTrackLink = artistObject.tracklist.split("?")[0] + "?limit=5";
    const resultb = await axios
      .get<{ data: TrackWithArtistAndAlbum[] }>(topTrackLink)
      .catch((e) => {
        res.status(500).json({ error: e.message });
        return;
      });
    if (resultb) {
      const { topAlbums, topTracks } = extractTopTracksAndAlbums(
        resultb.data.data
      );

      // get full albumInfo
      const { albums, error } = await getFullAlbumInfo(topAlbums);
      if (error) {
        res.status(500).json({ error: error.message });
      }

      artistObject.topAlbums = albums;
      artistObject.topTracks = topTracks;
      res.json({ result: artistObject });
    }
  }
  ``;
});
export { app };
export const handler = serverless(app);
