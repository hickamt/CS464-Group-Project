/**
 * Bootstrap 5.0 Cards: https://react-bootstrap.netlify.app/docs/components/cards/
 * Bootstrap 5.0 Grid: https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row
 */
// import Card from "react-bootstrap/Card";
import { useEffect, useState, useRef } from "react";
import expressQueryAPI from "../../api/expressQueryAPI";
import lcwCryptoAPI from "../../api/livecoinwatchAPI";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import lcwRemainingCredits from "../../api/lcwRemainingCredits";

// Utilities
import { spinAnimation, sortHighLow } from "./styles/utility";

// CSS Styles
import "./styles/card.css";
import CardBody from "./CardBody";

// Combine userData and cryptoData into one array (GH)
const combineData = function combineDataWithCryptoData(
  userData,
  cryptoData,
  setData,
  setAnimation
) {
  setAnimation(true);
  const temp = [];
  userData.map((data) => {
    const { asset, remaining } = data;
    const { rate, volume, delta } = cryptoData.find(
      (data) => data.code.toUpperCase() === asset.toUpperCase()
    );
    temp.push({
      asset: asset,
      remaining: remaining,
      spot: rate,
      value: rate * remaining,
      volume: volume,
      day: (delta.day - 1) * 100,
      hour: (delta.hour - 1) * 100,
      week: (delta.week - 1) * 100,
      month: (delta.month - 1) * 100,
    });
  });
  setData(sortHighLow(temp));
};

export default function Cards() {
  const [userData, setUserData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [animation, setAnimation] = useState(true);
  const cardRef = useRef(null); // reference to the card carousel left/right btns
  const [runEffect, setRunEffect] = useState(true);

  const [cardCarousel, setCardCarousel] = useState([]);

  // fetch expressQueryAPI and lcwCryptoAPI data, then combine data and set state
  useEffect(() => {
    console.log("Inside UseEffect()");
    lcwRemainingCredits();
    async function fetchData() {
      const userData = await expressQueryAPI("remaining");
      const cryptoData = await lcwCryptoAPI();
      if (userData && cryptoData) {
        combineData(userData, cryptoData, setUserData, setAnimation);
        setIsData(true);
        setAnimation(false);
      }
    }
    fetchData();
  }, [runEffect]);

  setTimeout(() => {
    if (runEffect) setRunEffect(false);
    else setRunEffect(true);
  }, 180000); // timer set to 3 seconds

  const scrollCardLeft = () => {
    const sLeft = (cardRef.current.scrollLeft -= 175); // adjust the scroll value as needed
    scrollTo({
      left: sLeft,
      behavior: "smooth",
    });
  };

  const scrollCardRight = () => {
    const sRight = (cardRef.current.scrollLeft += 175); // adjust the scroll value as needed
    scrollTo({
      left: sRight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {animation
        ? spinAnimation()
        : isData && (
            <>
              <h1 className="card-title d-none">Crypto Assets</h1>
              <CardBody userData={userData} cardRef={cardRef} />
              <BiLeftArrow className="arrow-left " onClick={scrollCardLeft} />
              <BiRightArrow
                className="arrow-right "
                onClick={scrollCardRight}
              />
            </>
          )}
    </>
  );
}
