import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import App from "./App";
import { SnackbarProvider } from "notistack";
ReactDOM.render(
  <SnackbarProvider maxSnack={1}>
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);
