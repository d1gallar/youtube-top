import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import ViewportProvider from "./hooks/Viewport/Viewport";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ViewportProvider>
    <App />
  </ViewportProvider>
);
