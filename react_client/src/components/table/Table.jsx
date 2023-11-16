import lcwRemainingCredits from "../../api/lcwRemainingCredits";
import expressQueryAPI from "../../api/expressQueryAPI";
import lcwCryptoAPI from "../../api/livecoinwatchAPI";
import SpinAnimation from "../animation/Animation";
import combineData from "./modules/combineTableData";
import { sumTotal } from "./modules/utility";
import { formatTableValues } from "./modules/tableFormat";
import { useState, useEffect } from "react";
import { TableHeaders } from "./modules/TableHeaders";
import Draggable from 'react-draggable'

import "./styles/table.css";

export default function Table() {
  const [isData, setIsData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [runEffect, setRunEffect] = useState(true);

  // fetch expressQueryAPI and lcwCryptoAPI data, then combine data and set state
  useEffect(() => {
    console.log("Inside UseEffect()");
    lcwRemainingCredits();
    async function fetchData() {
      const expressData = await expressQueryAPI("remaining");
      const cryptoData = await lcwCryptoAPI();
      if (expressData && cryptoData) {
        combineData(expressData, cryptoData, setTableData, setHeaders);
        setIsData(true);
      }
    }
    fetchData();
  }, [runEffect]);

  setTimeout(() => {
    setRunEffect(!runEffect);
  }, 180000); // timer set to 3 seconds

  return (
    <>
      {!isData ? (
        <SpinAnimation />
      ) : (
        <Draggable>
        <div className="table-container">
          <h1 className="d-none">Table</h1>

          <div className="table-outer-div">
            <table className="table">
              <thead className="table-head fixed-head">
                <tr className="table-header-row">
                  <TableHeaders
                    tableData={tableData}
                    setTableData={setTableData}
                    headers={headers}
                  />
                </tr>
              </thead>
              <tbody className="table-body scrollable-body">
                {tableData &&
                  tableData.map((item) => {
                    return (
                      <>
                        <tr
                          key={item.icon}
                          className="table-row"
                          onClick={() =>
                            window.open(`https://www.livecoinwatch.com/`)
                          }>
                          {Object.entries(item).map(([key, value]) =>
                            formatTableValues(key, value)
                          )}
                        </tr>
                      </>
                    );
                  })}
                <tr className="table-row table-totals" key={"totals"}>
                  <td className="table-data"></td>
                  <td className="table-data fs-5">TOTAL</td>
                  <td className="table-data"></td>
                  <td className="table-data"></td>
                  <td className="table-data fs-5">
                    {formatTableValues("value", sumTotal(tableData, "value"))}
                  </td>
                  <td className="table-data"></td>
                  <td className="table-data"></td>
                  <td className="table-data"></td>
                  <td className="table-data"></td>
                  <td className="table-data"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </Draggable>
      )}
    </>
  );
}
