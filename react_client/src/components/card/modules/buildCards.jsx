import Card from "react-bootstrap/Card";

import {
  getCryptoIcon,
  setValueToFixed,
  textColor,
  setPercentageToFixed,
} from "../styles/utility";

const cardImage = function buildCardImage(props) {
  return (
    <Card.Img
      className="card-img mx-auto"
      alt="cryptocurrency"
      variant="top"
      src={getCryptoIcon(props.asset)}
    />
  );
};

const cardBody = function buildCardBody(data) {
  return (
    <Card.Body className="card-body">
      <p className="card-text text-center fs-5">{data.asset.toUpperCase()}</p>
      <div className="card-text-body">
        <div className="value-type">
          <p className="card-text">Qty</p>
          <p className="card-text">Spot</p>
          <p className="card-text">Value</p>
          <p className="card-text">Hour</p>
          <p className="card-text">Day</p>
          <p className="card-text">Week</p>
          <p className="card-text">Month</p>
        </div>
        <div className="value">
          <p className="card-text p">{setValueToFixed(data.remaining)}</p>
          <p className="card-text p">${setValueToFixed(data.spot)}</p>
          <p className="card-text p">${setValueToFixed(data.value)}</p>
          <p className={`card-text p ${textColor(data.hour)}`}>
            {setPercentageToFixed(data.hour)}%
          </p>
          <p className={`card-text p ${textColor(data.day)}`}>
            {setPercentageToFixed(data.day)}%
          </p>
          <p className={`card-text p ${textColor(data.week)}`}>
            {setPercentageToFixed(data.week)}%
          </p>
          <p className={`card-text p ${textColor(data.month)}`}>
            {setPercentageToFixed(data.month)}%
          </p>
        </div>
      </div>
    </Card.Body>
  );
};

/**
 * Creates the react-bootstrap cards
 * @param userData is an array of data objects
 * @returns an array of cryptocurrency data cards
 */
const buildCards = function buildCryptoCards(userData) {
  const temp = [];

  userData.map((data, index) => {
    temp.push(
      <Card key={index} className="media-card ">
        {cardImage(data)}
        {cardBody(data)}
      </Card>
    );
  });
  return [...temp];
};

export default buildCards;
