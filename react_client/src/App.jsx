// import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

// MAIN Routes
// import Layout from "./components/nav_layout/Layout"; // Not using the navbar for this project
import Main from "./pages/Main";

/* Additional Routes for Custom Pages */
import Card from "./components/card/Card";
import Chart from "./components/chart/Chart";
import Table from "./components/table/Table";
// Contexts
import { AuthProvider } from "./context(s)/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Main />} />
          <Route path="card" element={<Card />} />
          <Route path="chart" element={<Chart />} />
          <Route path="table" element={<Table />} />
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
