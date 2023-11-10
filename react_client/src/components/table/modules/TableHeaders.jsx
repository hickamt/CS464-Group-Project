import { FaSort } from "react-icons/fa";
// import { switchAscDescValue } from "../../modules/buildTableColumns";

/**
 * Creates a table header column for as many names given in
 * the 'header' array
 * @param headers is an array of string column names
 * @returns table headers
 */
export const TableHeaders = ({ headers }) => {
  let header = [];
  headers.map((headerName, index) => {
    if (headerName === "icon") {
      header.push(<th key={index} scope="col" className="table-header"></th>);
    } else {
      header.push(
        <th key={index} scope="col" className="table-header" onClick={() => filterArray(headerName)}>
          {headerName}
          <FaSort className="table-fasort" />
        </th>
      );
    }
  });
  return header;
};
