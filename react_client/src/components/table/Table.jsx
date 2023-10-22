import { useState, useEffect } from "react";
import { TableHeaders } from "./modules/TableHeaders";
import lcwRemainingCredits from "../../api/lcwRemainingCredits";
import expressQueryAPI from "../../api/expressQueryAPI";
import lcwCryptoAPI from "../../api/livecoinwatchAPI";
import combineData from "./modules/combineData";
import "./styles/table.css";
import {
  setPercentageToFixed,
  setValueToFixed,
  textColor,
} from "./modules/utility";
// import { QueriesTableIcons } from "./modules/TableIconDropDowns";

export default function Table() {
  // const [showDropdown, setShowDropdown] = useState(false);
  const [isData, setIsData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);
  const [runEffect, setRunEffect] = useState(true);

  const formatTableValues = (key, value) => {
    switch (key) {
      case "icon":
        return (
          <td className="table-icon">
            <img
              className="table-icon mx-auto bg-muted rounded p-1"
              alt="cryptocurrency"
              src={value}
            />
          </td>
        );

      case "asset":
        return <td className="asset">{value.toUpperCase()}</td>;
      case "remaining":
      case "spot":
      case "value":
      case "volume":
        return <td className="table-data">{setValueToFixed(value).toLocaleString("en-US")}</td>;

      case "day":
      case "hour":
      case "week":
      case "month":
        return (
          <td className={`table-data ${textColor(value)}`}>
            {setPercentageToFixed(value)}%
          </td>
        );
    }
  };

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
      <div className="table-container mx-auto">
        <h1 className="d-none">Table</h1>

        <div className="table-outer-div">
          {/* QueriesTableIcons includes dropdown list of query questions
                and selector to view the query statement file */}
          {/* <div>
            <QueriesTableIcons
              showDropdown={showDropdown}
              setViewSqlFile={setViewSqlFile}
              viewSqlFile={viewSqlFile}
              columnOrder={columnOrder}
            />
          </div> */}

          <table className="table">
            <thead className="table-head">
              <tr className="table-header-row">
                <TableHeaders
                  headers={headers}
                  columnOrder={columnOrder}
                  setColumnOrder={setColumnOrder}
                />
              </tr>
            </thead>
            <tbody className="table-body">
              {tableData &&
                tableData.map((item) => {
                  return (
                    <>
                      <tr key={item.icon} className="table-row" onClick={() => window.open(`https://www.livecoinwatch.com/`)}>
                        {Object.entries(item).map(([key, value]) =>
                          formatTableValues(key, value)
                        )}
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
