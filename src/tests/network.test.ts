import { getSearchUrl, getArtistUrl, getAlbumUrl } from '../network';

describe('URL Functions', () => {
  const DEEZER_API = "https://api.deezer.com";

  describe('getSearchUrl', () => {
    it('should return the correct search URL', () => {
      const query = "test query";
      const expectedUrl = `${DEEZER_API}/search?q=track:"test query"`;
      expect(getSearchUrl(query)).toBe(expectedUrl);
    });
  });

  describe('getArtistUrl', () => {
    it('should return the correct artist URL', () => {
      const artistId = "12345";
      const expectedUrl = `${DEEZER_API}/artist/12345`;
      expect(getArtistUrl(artistId)).toBe(expectedUrl);
    });
  });

  describe('getAlbumUrl', () => {
    it('should return the correct album URL', () => {
      const albumId = "12345";
      const expectedUrl = `${DEEZER_API}/album/12345`;
      expect(getAlbumUrl(albumId)).toBe(expectedUrl);
    });
  });
});