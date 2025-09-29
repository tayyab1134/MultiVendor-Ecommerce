import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
//  import your tailwind CSS
//import "./app.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
