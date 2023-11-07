import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Cards from "../components/card/Card";
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table";

function Main() {
  const [mainView, setMainView] = useState("Main View");

  // Using 'Sidebar' button event.target.values
  // this could be abstracted as a module file
  // switchComponentView(value, setMainView) {}
  const switchComponentView = (e, value) => {
    e.preventDefault();
    switch (value) {
      case "card":
        setMainView(<Cards />);
        break;
      case "chart":
        setMainView(<Chart />);
        break;
      case "table":
        setMainView(<Table />);
        break;
      default:
        setMainView("Main View");
        break;
    }
  };

  return (
    <div className="main-view-container">
      <Sidebar switchComponentView={switchComponentView} />
      <div className="dashboard-container mt-3">
        <div className="main-header ">
          <Header />
        </div>

        <div className="main-view d-flex justify-content-center">
          <Chart />
          {/* {mainView} */}
        </div>

        <div className="main-footer d-flex justify-content-center">
          {/* <Footer /> */}
          {mainView}
        </div>
      </div>
    </div>
  );
}

export default Main;
