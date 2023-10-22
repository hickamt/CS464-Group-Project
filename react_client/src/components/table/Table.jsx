import { useState, useEffect } from "react";
import { TableHeaders } from "./modules/TableHeaders";
import lcwRemainingCredits from "../../api/lcwRemainingCredits";
import expressQueryAPI from "../../api/expressQueryAPI";
import lcwCryptoAPI from "../../api/livecoinwatchAPI";
import combineData from "./modules/combineData";
import "./styles/table.css";
// import { QueriesTableIcons } from "./modules/TableIconDropDowns";

export default function Table() {
  // const [showDropdown, setShowDropdown] = useState(false);
  const [isData, setIsData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);
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
      <div className="component-two text-center mt-3">
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
                tableData.map((item, index) => {
                  return (
                    <>
                      {/* @Todo: resolve unique row key={} error
                                 should be able to use the listing_id*/}
                      <tr key={index} className="table-row">
                        {Object.values(item).map((data, i) => (
                          <td key={i + index} className="table-body">
                            {typeof data === "boolean" ? data.toString() : data}
                          </td>
                        ))}
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
