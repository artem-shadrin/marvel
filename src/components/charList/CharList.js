import "./charList.scss";
import { useMemo, useRef, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useEffect } from "react/cjs/react.development";
import useMarvelService from "../../services/marvelService";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};
const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charListOffset, setCharListOffset] = useState(210);
  const [charListEnded, setCharListEnded] = useState(false);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onRequest(charListOffset, false), []);

  const onRequest = (offset = charListOffset, initial = true) => {
    setNewItemLoading(initial);
    getAllCharacters(9, offset)
      .then(onCharListLoaded)
      .then(() => setProcess("confirmed"));
  };
  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) ended = true;
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setCharListOffset((charListOffset) => charListOffset + 9);
    setCharListEnded(ended);
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
    const items = (
      <TransitionGroup component={null} timeout={500}>
        {arr.map((char, i) => {
          const { name, thumbnail, id } = char;
          const imgStyle =
            thumbnail.indexOf("image_not_available.jpg") !== -1
              ? { objectFit: "unset" }
              : { objectFit: "cover" };

          return (
            <CSSTransition key={id} timeout={500} classNames="item">
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
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
    return <ul className="char__grid">{items}</ul>;
  };
  const elements = useMemo(() => {
    return setContent(process, () => renderItems(charList), newItemLoading);
    // eslint-disable-next-line
  }, [process]);
  return (
    <div className="char__list">
      {elements}
      <button
        className="button button__main button__long"
        style={{ display: charListEnded ? "none" : "block" }}
        disabled={newItemLoading}
        onClick={() => onRequest(charListOffset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
