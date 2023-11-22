import { FaSort } from "react-icons/fa";
import { useState } from "react";
import { filterArray } from "./tableSort";

/**
 * Creates a table header column for as many names given in
 * the 'header' array
 * @param headers is an array of string column names
 * @returns table headers
 */
export const TableHeaders = ({ tableData, setTableData, headers }) => {
  const [sortHighLow, setSortHighLow] = useState(true);

  let header = [];
  headers.map((headerName, index) => {
    if (headerName === "icon") {
      header.push(<th key={index} scope="col" className="table-header" style={{color: 'transparent'}}>icons</th>);
    } else {
      header.push(
        <th
          key={index}
          scope="col"
          className="table-header"
          onClick={() => filterArray(sortHighLow, setSortHighLow, tableData, setTableData, headerName)}>
          {headerName.toUpperCase()}
          <FaSort className="table-fasort" />
        </th>
      );
    }
  });
  return header;
};
