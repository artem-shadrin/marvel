import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/marvelService";

import setContent from "../../utils/setContent";

const RandomChar = () => {
  const [char, setChar] = useState(null);
  const { process, getCharacterById,  setProcess } =
    useMarvelService();

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 60000);

    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacterById(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };
  const onRandomChar = (e) => {
    updateChar();
  };
  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner" onClick={onRandomChar}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};
const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;
  const imgStyle =
    thumbnail.indexOf("image_not_available.jpg") !== -1
      ? { objectFit: "unset" }
      : { objectFit: "cover" };

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
