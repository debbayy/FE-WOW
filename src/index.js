import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ShowContextTokenProvider } from "./components/context/showContext";
import { ShowContexModal } from "./components/context/showModalSub";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ShowContextTokenProvider>
      <ShowContexModal>
        <Router>
          <App />
        </Router>
      </ShowContexModal>
    </ShowContextTokenProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
