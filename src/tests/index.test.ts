import request from "supertest";
import axios from "axios";
import { app } from "../index";
import { artistMain, trackObj } from "./mock";
import { extractTopTracksAndAlbums, getFullAlbumInfo } from "../utils";

jest.mock("axios");
jest.mock("../utils", () => ({
  extractTopTracksAndAlbums: jest.fn(),
  getFullAlbumInfo: jest.fn(),
}));

describe("Express App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("GET /", () => {
    it("should return a welcome message", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Hello Remotemore" });
    });
  });

  describe("GET /track", () => {
    it('should return 400 if query parameter "q" is missing', async () => {
      const response = await request(app).get("/track");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "search params 'q' is required" });
    });

    it('should return track data if query parameter "q" is provided', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: trackObj,
      });

      const response = await request(app)
        .get("/track")
        .query({ q: "test query" });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ result: trackObj });
    });
  });

  describe("GET /artist/:id", () => {
    it("should return artist data if artist ID is valid", async () => {
      (axios.get as jest.Mock)
        .mockResolvedValueOnce({
          data: artistMain,
        })
        .mockResolvedValueOnce({ data: { data: [{ good: "stuff" }] } });

      (extractTopTracksAndAlbums as jest.Mock).mockReturnValueOnce({
        topAlbums: [],
        topTracks: [],
      });
      (getFullAlbumInfo as jest.Mock).mockReturnValueOnce({
        albums: [],
        error: null,
      });

      const response = await request(app).get("/artist/12345");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        result: {
          tracklist: "https://api.deezer.com/artist/12345/top?limit=5",
          topAlbums: [],
          topTracks: [],
        },
      });
    });
  });
});
