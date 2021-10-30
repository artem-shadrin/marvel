import "./comicsList.scss";
import useMarvelService from "../../services/marvelService";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [comicsListOffset, setComicsListOffset] = useState(100);
  const [comicsListEnded, setComicsListEnded] = useState(false);
  const { error, loading, getAllComics, clearError } = useMarvelService();
  useEffect(() => {
    onRequest(comicsListOffset, false);
  }, []);
  const onRequest = (offset = comicsListOffset, initial = true) => {
    clearError();
    getAllComics(8, comicsListOffset).then(onComicsLoaded);
  };
  const onComicsLoaded = (comics) => {
    if (comics.lenght < 8) {
      setComicsListEnded(true);
    }
    setComicsList((comicsList) => [...comicsList, ...comics]);
    setComicsListOffset((comicsListOffset) => comicsListOffset + 8);
  };
  const renderItems = (arr) => {
    const items = arr.map((comics, i) => {
      const { title, thumbnail, price, id } = comics;
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${id}`}>
            <img src={thumbnail} alt={title} className="comics__item-img" />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  };
  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingComics = loading ? <Spinner /> : null;
  return (
    <div className="comics__list">
      {errorMessage}
      {loadingComics}
      {renderItems(comicsList)}
      <button
        className="button button__main button__long"
        onClick={onRequest}
        disabled={loading}
        style={{ display: comicsListEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
