import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const _apiKey = "apikey=55c7d7d8018d2bc19dc08d0f9c83d3b7";
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const { loading, error, request, clearError } = useHttp();

  const getAllCharacters = async (limit = 9, offset = 210) => {
    const res = await request(
      `${_apiBase}characters?limit=${limit}&offset=${offset}}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };
  const getCharacterById = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };
  const getAllComics = async (limit = 8, offset = 210) => {
    const res = await request(
      `${_apiBase}comics?limit=${limit}&offset=${offset}}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };
  const getComicById = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };
  const _transformCharacter = ({
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
      description: description
        ? `${description.slice(0, 210)}...`
        : "There is no description for this character",
      comics: comics.items,
      thumbnail: thumbnail.path + "." + thumbnail.extension,
      homepage: urls[0].url,
      wiki: urls[1].url,
    };
  };
  const _transformComics = (comics) => ({
    id: comics.id,
    title: comics.title,
    description: comics.description || "There is no description",
    pageCount: comics.pageCount
      ? `${comics.pageCount} p.`
      : "No information about the number of pages",
    thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
    // language: comics.textObjects[0].language || "en-us",
    price: comics.prices.price ? `${comics.prices.price}$` : "not available",
  });
  return {
    error,
    loading,
    clearError,
    getAllCharacters,
    getCharacterById,
    getAllComics,
    getComicById,
  };
};
export default useMarvelService;
