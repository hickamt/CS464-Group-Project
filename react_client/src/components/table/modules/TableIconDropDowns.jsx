/**
 * Goal:
 * Create a Dropdown above table that allows queries (q001 - q020)
 * Using a pre-built array which should include:
 * array = [ {q000: "Question to be queried"} ]
 */
import { Popup } from "semantic-ui-react";
import { FaListOl } from "react-icons/fa";
import { BsFiletypeSql } from "react-icons/bs";
import { SiReactquery } from "react-icons/si";

function orderByTableView(columnOrder) {
  let temp = [];
  // temp.push("ORDER BY: ");
  for (const key in columnOrder) {
    temp.push(columnOrder[key]);
    temp.push(" ");
  }
  return temp;
}

/**
 * Creates the Icons at the top of the Query.jsx table allowing:
 * Dropdown of query questions to be selected, calling the postQueryAPI
 * Button selector to open the Modal View of the Query Statements
 * @param {*} param0
 * @returns
 */
export const QueriesTableIcons = ({
  // eslint-disable-next-line react/prop-types
  showDropdown,
  // eslint-disable-next-line react/prop-types
  setViewSqlFile,
  // eslint-disable-next-line react/prop-types
  viewSqlFile,
  // eslint-disable-next-line react/prop-types
  columnOrder,
}) => {
  return showDropdown ? (
    <div className="dropdown table-icon-div">
      <button
        className="btn icon-btn"
        type="button"
        id="faList"
        data-bs-toggle="dropdown"
        aria-label="dropdown list of sql queries"
        aria-expanded="false">
        <Popup
          className="icon-popup"
          content="Query List"
          trigger={<FaListOl className="falist-Ol-icon" />}
        />
      </button>
      <ul className="dropdown-menu" aria-labelledby="faList">
        <li>Add Dropdown List Here?</li>
      </ul>

      <button
        className="btn icon-btn"
        type="button"
        id="bsFiletype"
        aria-label="view query statement selector">
        <Popup
          className="icon-popup"
          content="View SQL"
          trigger={
            <BsFiletypeSql
              className="bsFiletype-sql-icon"
              onClick={() => setViewSqlFile(!viewSqlFile)}
            />
          }
        />
      </button>
      <button
        className="btn icon-btn"
        type="button"
        id="siReactQuery"
        aria-label="fetch new order by query statement">
        <Popup
          className="icon-popup"
          content="Get ORDER BY"
          trigger={
            <SiReactquery
              className="siReact-query-icon"
              onClick=""
            />
          }
        />
      </button>
      {orderByTableView(columnOrder)}
    </div>
  ) : (
    ""
  );
};
