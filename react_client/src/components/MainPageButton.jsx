/* eslint-disable react/prop-types */
// Button to call express server data on assets[] or exchanges[]

export function MainPageButton({ postQuery }) {
  console.log("Test Component Post Query Data: ", postQuery);
  return (
    <div className="main-dropdown-btn-container">
      <select
        name="express_data"
        id="selectData"
        className="test-component-btn">
        <option
          value="assets"
          className="main-item-option"
          onClick={(e) => postQuery(e, e.target.value)}>
          Assets
        </option>
        <option
          value="exchanges"
          className="main-item-option"
          onClick={(e) => postQuery(e, e.target.value)}>
          Exchanges
        </option>
      </select>
    </div>
  );
}
