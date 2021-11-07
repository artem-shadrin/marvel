import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import setContent from "../../utils/setContent";
import useMarvelService from "../../services/marvelService";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { getComicById, getCharacterById, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateData = () => {
    // eslint-disable-next-line default-case
    switch (dataType) {
      case "comic":
        getComicById(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
      case "character":
        getCharacterById(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
