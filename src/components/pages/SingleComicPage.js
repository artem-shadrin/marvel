import "./singleComic.scss";
import { useState } from "react/cjs/react.development";
import useMarvelService from "../../services/marvelService";
import Spinner from "../spinner/Spinner";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const SingleComicPage = () => {
  const [comic, setComic] = useState(null);
  const { error, loading, getComicById, clearError } = useMarvelService();
  const { comicId } = useParams();
  const onComicLoaded = (comic) => {
    setComic(comic);
  };
  useEffect(() => {
    clearError();
    getComicById(comicId).then(onComicLoaded);
  }, []);

  const errorMessage = error ? <errorMessage /> : null;
  const loaded = loading ? <Spinner /> : null;
  const content = !(loading || error) && comic ? <View comic={comic} /> : null;
  return (
    <>
      {errorMessage}
      {loaded}
      {content}
    </>
  );
};
const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
