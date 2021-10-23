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
  };
  marvelService = new MarvelService();
  componentDidMount() {
    this.marvelService.getAllCharacters(9, 111).then(this.onCharLoaded);
  }
  onCharLoaded = (charList) => this.setState({ charList, loading: false });
  onError = () => this.setState({ error: true });
  onCharLoading = () => this.setState({ loading: true });
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
    const { charList, loading, error } = this.state;
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
