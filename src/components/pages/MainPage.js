import { useState } from "react/cjs/react.development";
import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
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
        <ErrorBoundary>
          <CharInfo charId={charId} />
        </ErrorBoundary>
      </div>
    </>
  );
};
export default MainPage;
