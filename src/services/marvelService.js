export default class MarvelService {
  _apiKey = "apikey=55c7d7d8018d2bc19dc08d0f9c83d3b7";
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };
  getAllCharacters = async (limit = 9, offset = 210) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=${limit}&offset=${offset}}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };
  getCharacterById = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };
  _transformCharacter = ({
    id,
    name,
    description,
    thumbnail,
    urls,
    comics,
  }) => {
    return {
      id,
      name,
      description,
      comics: comics.items,
      thumbnail: thumbnail.path + "." + thumbnail.extension,
      homepage: urls[0].url,
      wiki: urls[1].url,
    };
  };
}
