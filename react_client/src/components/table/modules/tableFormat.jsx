import {
  setValueToFixed,
  setPercentageToFixed,
} from "../../../modules/utility";
import { textColor } from "../../../modules/themes";

// format number to include commas
const formatNumber = function formatCommaSeparatedNumber(number) {
  let [whole, decimal] = number.toString().split(".");
  whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal ? `${whole}.${decimal}` : whole;
};

// format table values based on key
export const formatTableValues = (key, value) => {
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
      return (
        <td className="table-data">{formatNumber(setValueToFixed(value))}</td>
      );

    case "volume":
      return !value ? (
        <td>$0</td>
      ) : (
        <td className="table-data">
          ${formatNumber(Number.parseFloat(value).toFixed(0))}
        </td>
      );

    case "spot":
    case "value":
      return (
        <td className="table-data">${formatNumber(setValueToFixed(value))}</td>
      );

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
