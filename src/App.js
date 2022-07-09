import { StyleApp, StyleAppContent } from "./App.style";
// import MovieContainer from "./containers/MovieContainer";
import MovieContainer from "./infos/MovieSetCallback";

const App = () => {
  return (
    <StyleApp>
      <StyleAppContent>
        <MovieContainer />
      </StyleAppContent>
    </StyleApp>
  );
}

export default App;
