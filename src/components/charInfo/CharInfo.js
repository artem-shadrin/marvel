import "./charInfo.scss";
import { useEffect, useState } from "react";

import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import MarvelService from "../../services/marvelService";
const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const marvelService = new MarvelService();
  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };
  const onCharLoading = () => setLoading(true);
  const onError = () => {
    setLoading(false);
    setError(true);
  };
  const updateChar = () => {
    const { charId } = props;
    if (!charId) return;
    onCharLoading();
    marvelService.getCharacterById(charId).then(onCharLoaded).catch(onError);
  };

  const skeleton = !(char || loading || error) ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const loaded = loading ? <Spinner /> : null;
  const content = !(loading || error) && char ? <View char={char} /> : null;
  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {loaded}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const comicsList = comics.length ? (
    <Comics comics={comics} />
  ) : (
    <p>Comics not found :(</p>
  );
  const imgStyle =
    thumbnail.indexOf("image_not_available.jpg") !== -1
      ? { objectFit: "unset" }
      : { objectFit: "cover" };
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{comicsList}</ul>
    </>
  );
};
const Comics = ({ comics }) => {
  return comics.map((item, i) => {
    // eslint-disable-next-line
    if (i > 9) return;
    return (
      <li key={i} className="char__comics-item">
        {item.name}
      </li>
    );
  });
};

export default CharInfo;
