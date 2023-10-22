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

/**
 * 'detailQueries & formQueries' should be generated from the server-side
 * and not static on the client-side.
 */
const detailQueries = [
  {
    q0001: "All Purchases Details",
    q0002: "All Sales Details",
    q0003: "Remaining Quantity",
    q0008: "Gain/Loss 2021",
    q0009: "Gain/Loss 2022",
  },
];

const formQueries = [
  {
    f8949_all: "Earned Income all years",
    f8949_2021: "Earned Income Report 2021",
    f8949_2022: "Earned Income Report 2022",
    f8949_2023: "Earned Income Report 2023",
    f1040_all: "Other Income all years",
    f1040_2021: "Other Income 2021",
    f1040_2022: "Other Income 2022",
    // f1040_2023: "Other Income 2023",
  },
];

function buildQueryList(postQuery, queryType) {
  const queries = queryType === "forms" ? formQueries : detailQueries;
  let list = [];
  list.push(
    <li className="dropdown-heading">
      <p className="dropdown-heading-item">Queries</p>
    </li>
  );
  queries.map((query) => {
    for (const index in query) {
      list.push(
        <li key={index}>
          <a
            className="dropdown-item"
            value={index}
            onClick={(event) => postQuery("queries", index, event)}>
            {`${index}: ${query[index]}`}
          </a>
        </li>
      );
    }
  });
  return list;
}

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
  queryType,
  // eslint-disable-next-line react/prop-types
  showDropdown,
  // eslint-disable-next-line react/prop-types
  postQuery,
  // eslint-disable-next-line react/prop-types
  setViewSqlFile,
  // eslint-disable-next-line react/prop-types
  viewSqlFile,
  // eslint-disable-next-line react/prop-types
  columnOrder,
  // eslint-disable-next-line react/prop-types
  postOrderBy,
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
        {buildQueryList(postQuery, queryType)}
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
              onClick={(e) => postOrderBy(e)}
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
