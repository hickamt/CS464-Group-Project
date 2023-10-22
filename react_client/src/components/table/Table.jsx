import { useState } from "react";
// import fetchAnimation from "../components/shared/fetchAnimation"; // use react-loading animation
import { TableHeaders } from "../components/shared/TableHeaders";
// import api here for livecoinwatch and call to express server
import { QueriesTableIcons } from "../components/queries/QueriesTableIcons";
import "./styles/table.css"

export default function Table() {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [viewSqlFile, setViewSqlFile] = useState(false);
  const [columnOrder, setColumnOrder] = useState([]);


  return (
    <>
      <div className="component-two text-center mt-3">
        <h1>Table</h1>

         <div className="table-outer-div">
          {/* QueriesTableIcons includes dropdown list of query questions
                and selector to view the query statement file */}
          <div>
            <QueriesTableIcons
              queryType="forms"
              showDropdown={showDropdown}
              postQuery={postQuery}
              setViewSqlFile={setViewSqlFile}
              viewSqlFile={viewSqlFile}
              columnOrder={columnOrder}
              postOrderBy={postOrderBy}
            />
          </div>

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
                      {/* @Todo: resolve unique row key={} error
                                 should be able to use the listing_id*/}
                      <tr className="table-row">
                        {Object.values(item).map((data, index) => (
                          <td key={index} className="table-body">
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
