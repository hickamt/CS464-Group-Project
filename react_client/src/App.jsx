// import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

// MAIN Routes
import Layout from "./components/nav_layout/Layout"; // All page routes are wrapped within the Nav Layout
import Main from "./pages/Main";

/* Additional Routes for Custom Pages */
import Card from "./components/card/Card";
import ComponentB from "./components/compt_b/ComponentB";
import ComponentC from "./components/compt_c/ComponentC";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="card" element={<Card />} />
          <Route path="componentB" element={<ComponentB />} />
          <Route path="componentC" element={<ComponentC />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
