/* eslint-disable react/prop-types */

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
        {/* <option
          value="purchases"
          className="main-item-option"
          onClick={(e) => postQuery(e, e.target.value)}>
          Purchases
        </option>
        <option
          value="sales"
          className="main-item-option"
          onClick={(e) => postQuery(e, e.target.value)}>
          Sales
        </option>
        <option
          value="remaining"
          className="main-item-option"
          onClick={(e) => postQuery(e, e.target.value)}>
          Remaining
        </option> */}
      </select>
    </div>
  );
}
