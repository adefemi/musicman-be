import { extractTopTracksAndAlbums, getFullAlbumInfo } from "../utils";
import { TrackAlbum, TrackWithArtistAndAlbum } from "../schema";
import { trackArtist1, album2, trackArtist2, album1, track1, track2, trackAlbumList } from "./mock";
import axios  from "axios"

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("extractTopTracksAndAlbums Function", () => {
  it("should correctly extract top tracks and albums", () => {
    // Arrange: Create a sample input
    const sampleInput: TrackWithArtistAndAlbum[] = [
      {
        ...trackArtist1,
        album: album1,
      },
      {
        ...trackArtist2,
        album: album2,
      },
    ];

    const result = extractTopTracksAndAlbums(sampleInput);

    expect(result).toEqual({
      topTracks: [track1, track2],
      topAlbums: [album1, album2],
    });
  });
});


describe("getFullAlbumInfo Function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should fetch full album info successfully', async () => {
    const albums: TrackAlbum[] = trackAlbumList;
  
    const mockResponseData = [
      { data: trackAlbumList[0] },
      { data: trackAlbumList[1] },
    ];

    for (let i of albums) {
      mockedAxios.get.mockImplementation((_) => {
        return Promise.resolve({data: i})
      })
    }
  
    const promise = getFullAlbumInfo(albums);
  
    const { albums: resultAlbums, error } = await promise;
  
    expect(resultAlbums).toEqual(mockResponseData.map(response => response.data));
    expect(error).toBeNull();
  });
  test('should handle error correctly', async () => {
    const albums: TrackAlbum[] = trackAlbumList;

    const mockError = {
      message: "test error",
    };

    mockedAxios.get.mockRejectedValue(mockError);

    const { albums: resultAlbums, error } = await getFullAlbumInfo(albums);

    expect(resultAlbums).toEqual([]);
    expect(error).toEqual(mockError);
  });
})