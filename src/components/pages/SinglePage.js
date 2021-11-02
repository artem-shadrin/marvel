import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/marvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { loading, error, getComicById, getCharacterById, clearError } =
    useMarvelService();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateData = () => {
    clearError();

    // eslint-disable-next-line default-case
    switch (dataType) {
      case "comic":
        getComicById(id).then(onDataLoaded);
        break;
      case "character":
        getCharacterById(id).then(onDataLoaded);
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
