import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/marvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

export default class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    charListOffset: 1550,
    charListLoading: false,
    charListEnded: false,
  };
  marvelService = new MarvelService();
  componentDidMount() {
    this.onRequest();
  }
  onError = () => this.setState({ error: true });
  onCharListLoading = () => {
    this.setState({ charListLoading: true });
  };
  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) ended = true;
    this.setState(({ charList, charListOffset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      charListLoading: false,
      charListOffset: charListOffset + 9,
      charListEnded: ended,
    }));
  };
  onRequest = (offset = this.state.charListOffset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(9, offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };
  renderItems = (arr) => {
    const items = arr.map((char) => {
      const { name, thumbnail, id } = char;
      const imgStyle =
        thumbnail.indexOf("image_not_available.jpg") !== -1
          ? { objectFit: "unset" }
          : { objectFit: "cover" };

      return (
        <li
          className="char__item"
          key={id}
          onClick={() => this.props.onUpdateChar(id)}
        >
          <img src={thumbnail} alt="thumbnail" style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };
  render() {
    const {
      charList,
      loading,
      error,
      charListEnded,
      charListLoading,
      charListOffset,
    } = this.state;
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          style={{ display: charListEnded ? "none" : "block" }}
          disabled={charListLoading}
          onClick={() => this.onRequest(charListOffset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
