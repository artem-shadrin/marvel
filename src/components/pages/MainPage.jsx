import { useState } from "react";
import CharInfo from "../charInfo/CharInfo.jsx";
import CharList from "../charList/CharList.jsx";
import CharSearchForm from "../charSearchForm/CharSearchForm.jsx";
import ErrorBoundary from "../errorBoundary/ErrorBoundary.jsx";
import RandomChar from "../randomChar/RandomChar.jsx";

const MainPage = () => {
  const [charId, setCharId] = useState(null);
  const onUpdateChar = (id) => setCharId(id);
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onUpdateChar={onUpdateChar} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={charId} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
export default MainPage;
