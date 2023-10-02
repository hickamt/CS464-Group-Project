import { useState } from "react";
import { expressQueryAPI } from "../api/expressQueryAPI";
import { FetchAnimation } from "../components/animation/FetchAnimation";
import { MainPageButton } from "../components/main/MainPageButton";
import { DisplayData } from "../components/main/DisplayData";

function Main() {
  const [expressData, setExpressData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [animation, setAnimation] = useState(false);

  const postQuery = (e, value) => {
    e.preventDefault();
    setAnimation(true); // animation while fetching data

    // Makes the API Call: "../api/expressQueryAPI.jsx"
    expressQueryAPI(value, setExpressData, setIsData, setAnimation);
  };

  return (
    <>
      <div className="main-container text-center mt-3">
        <h1>Main Page</h1>
        <MainPageButton postQuery={postQuery} />
        <div className="express-data-div">
          {isData && <DisplayData data={expressData} />}
        </div>

        {animation && <FetchAnimation />}
      </div>
    </>
  );
}

export default Main;
