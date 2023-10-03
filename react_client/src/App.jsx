// import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

// MAIN Routes
import Layout from "./components/Layout"; // All page routes are wrapped within the Nav Layout
import Main from "./pages/Main";

/* Additional Routes for Custom Pages */
import Nathan from "./components/nathan/Nathan"
import Todd from "./components/todd/Todd"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="nathan" element={<Nathan />} />
          <Route path="todd" element={<Todd />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
