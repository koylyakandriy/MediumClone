import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import TopBar from "./components/TopBar";
import { CurrentUSerProvider } from "./context/currentUser";
import CurrentUserChecker from "./components/CurrentUserChecker";

const App = () => {
  return (
    <CurrentUSerProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUSerProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
