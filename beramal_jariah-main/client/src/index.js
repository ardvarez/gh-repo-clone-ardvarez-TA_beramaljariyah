import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";
import App from "./App";

import { UserContextProvider } from "./contexts/userContext";
import { SearchContextProvider } from "./contexts/searchContext";

ReactDOM.render(
  <React.StrictMode>
    <SearchContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SearchContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
