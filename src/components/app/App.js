import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () => {
  const [charId, setCharId] = useState(null);
  const onUpdateChar = (id) => setCharId(id);
  return (
    <div className="app">
      <AppHeader />
      <main>
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
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
