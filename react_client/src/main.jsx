import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Global CSS Page Styles
import "./index.css";
import "./styles/main.css";

// use of semantic-ui script will hijack all other css in this file
// DO NOT USE THE FOLLOWING IMPORT:
// import 'semantic-ui-css/semantic.min.css'

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
