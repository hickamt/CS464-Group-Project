/* eslint-disable react/prop-types */

/**
 * Concept for CARDS:
 *   - push each card element to an array[]
 *   - use this array of elements to render those cards
 *     specified by left_index & right_index
 *   Sources: https://stackoverflow.com/questions/40476075/how-to-concatenate-jsx-elements-into-an-array
 *   Array.with() MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with
 */

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useState } from "react";

const buildCard = function buildCryptoCards(data, index) {
  return (
    <Card key={index} className="media-card ">
      <Card.Img
        className="card-img mx-auto"
        alt="cryptocurrency"
        variant="top"
        src={getCryptoIcon(data.asset)}
      />
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
    </Card>
  );
};

// Utilities
import {
  getCryptoIcon,
  textColor,
  setValueToFixed,
  setPercentageToFixed,
} from "./styles/utility";

// Continue getting incorrect errors for 'props'
export default function CardBody({ userData }) {

  return (
    userData.map((data, index) => buildCard(data, index))
  );
}
