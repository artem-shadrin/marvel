import { useState } from "react/cjs/react.development";
import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";

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
