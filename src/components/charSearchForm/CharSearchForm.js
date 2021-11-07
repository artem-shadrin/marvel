import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import useMarvelService from "../../services/marvelService";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./charSearchForm.scss";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      break;
    case "loading":
      return <Spinner />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};
const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { getCharacterByName, setProcess, process } = useMarvelService();
  const onCharLoaded = (char) => {
    setChar(char);
  };
  const updateChar = (charName) => {
    getCharacterByName(charName)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };
  const results = ({ data }) => {
    console.log(data);
    if (!data ? null : data.length > 0) {
      return (
        <div className="char__search-wrapper">
          <div className="char__search-success">
            There is! Visit {data[0].name} page?
          </div>
          <Link
            to={`/characters/${data[0].id}`}
            className="button button__secondary"
          >
            <div className="inner">To page</div>
          </Link>
        </div>
      );
    }
    return (
      <div className="char__search-error">
        The character was not found. Check the name and try again
      </div>
    );
  };
  return (
    <>
      <div className="char__search-form">
        <Formik
          initialValues={{ charName: "" }}
          validationSchema={Yup.object({
            charName: Yup.string().required("This field is required"),
          })}
          onSubmit={({ charName }) => {
            updateChar(charName);
          }}
        >
          <Form>
            <label className="char__search-label" htmlFor="charName">
              Or find a character by name:
            </label>
            <div className="char__search-wrapper">
              <Field
                id="charName"
                name="charName"
                type="text"
                placeholder="Enter name"
              />
              <button
                type="submit"
                className="button button__main"
                disabled={process === "loading"}
              >
                <div className="inner">find</div>
              </button>
            </div>
            <FormikErrorMessage
              component="div"
              className="char__search-error"
              name="charName"
            />
          </Form>
        </Formik>
        {setContent(process, results, char)}
      </div>
    </>
  );
};

export default CharSearchForm;
