import { useState } from "react";
// import FetchAnimation from "../components/animation/FetchAnimation";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/card/Card";
import ComponentB from "../components/compt_b/ComponentB";
import ComponentC from "../components/compt_c/ComponentC";

function Main() {
  const [mainView, setMainView] = useState("Main View");

  // Using 'Sidebar' button event.target.values
  // this could be abstracted as a module file
  // switchComponentView(value, setMainView) {}
  const switchComponentView = (e, value) => {
    e.preventDefault();
    switch (value) {
      case "card":
        setMainView(<Card />);
        break;
      case "chart":
        setMainView(<ComponentB />);
        break;
      case "table":
        setMainView(<ComponentC />);
        break;
      default:
        setMainView("Main View");
        break;
    }
  };
  return (
    <>
      <div className="dashboard-container text-center mt-3">
        <Header />
        <div className="main-view bg-dark rounded">{mainView}</div>
        <Sidebar switchComponentView={switchComponentView} />
        <Footer />
      </div>
    </>
  );
}

export default Main;
