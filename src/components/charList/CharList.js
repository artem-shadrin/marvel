import "./charList.scss";
import { useRef, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useEffect } from "react/cjs/react.development";
import useMarvelService from "../../services/marvelService";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [charListOffset, setCharListOffset] = useState(210);
  const [charListLoading, setCharListLoading] = useState(false);
  const [charListEnded, setCharListEnded] = useState(false);
  const { error, loading, getAllCharacters } = useMarvelService();
  useEffect(() => onRequest(charListOffset, false), []);
  const onCharListLoading = () => setCharListLoading(true);
  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) ended = true;
    setCharList((charList) => [...charList, ...newCharList]);
    setCharListLoading(false);
    setCharListOffset((charListOffset) => charListOffset + 9);
    setCharListEnded(ended);
  };
  const onRequest = (offset = charListOffset, initial = true) => {
    setCharListLoading(initial);
    onCharListLoading();
    getAllCharacters(9, offset).then(onCharListLoaded);
  };
  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };
  const renderItems = (arr) => {
    const items = arr.map((char, i) => {
      const { name, thumbnail, id } = char;
      const imgStyle =
        thumbnail.indexOf("image_not_available.jpg") !== -1
          ? { objectFit: "unset" }
          : { objectFit: "cover" };

      return (
        <li
          className="char__item"
          key={id}
          tabIndex={0}
          onClick={() => {
            props.onUpdateChar(id);
            focusOnItem(i);
          }}
          ref={(el) => (itemRefs.current[i] = el)}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onUpdateChar(id);
              focusOnItem(i);
            }
          }}
        >
          <img src={thumbnail} alt="thumbnail" style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {renderItems(charList)}
      <button
        className="button button__main button__long"
        style={{ display: charListEnded ? "none" : "block" }}
        disabled={charListLoading}
        onClick={() => onRequest(charListOffset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
