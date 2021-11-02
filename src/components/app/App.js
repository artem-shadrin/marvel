import AppHeader from "../appHeader/AppHeader";
import { lazy, Suspense } from "react";
import decoration from "../../resources/img/vision.png";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Spinner from "../spinner/Spinner";
import SinglePage from "../pages/SinglePage";
import SingleCharacterLayout from "../pages/singeCharacterLayout/SingleCharacterLayout";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";

const ComicsPage = lazy(() => import("../pages/ComicPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const Page404 = lazy(() => import("../pages/Page404"));
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>

              <Route exact path="/comics">
                <ComicsPage />
              </Route>
              <Route exact path="/comics/:id">
                <SinglePage Component={SingleComicLayout} dataType="comic" />
              </Route>
              <Route exact path="/characters/:id">
                <SinglePage
                  Component={SingleCharacterLayout}
                  dataType="character"
                />
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          </Suspense>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
