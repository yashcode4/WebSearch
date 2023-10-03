import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as WebSearchRouter } from "react-router-dom";

import App from './App';
import './global.css';

import { ResultContextProvider } from "./contexts/ResultContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ResultContextProvider>
    <WebSearchRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </WebSearchRouter>
  </ResultContextProvider>
);