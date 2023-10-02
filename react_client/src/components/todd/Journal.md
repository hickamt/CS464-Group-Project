# CS 464 Journal

This component will build a Card to display the users asset details for each cryptocurrency coin/token. Each card will require a call to the express backend to retrieve purchase and sales data for each cryptocurrency and an API call to LiveCoinWatch for the current spot price of that asset.

## Card Key:Value Properties
.
```js
cardConfig = {
  logo: "Card Logo", // LiveCoinWatch png32 icon/logo
  name: "Asset Name", // Express data for asset name
  quantity: 0.0, // Express data for remaining quantity of the asset
  spot_price: 0.0, // LiveCoinWatch current price of asset
  value: 0.0, // this.quantity * this.spot_price
  day: 0.0, // 24 change as percent: (delta - 1) * 100 + '%'
  week: 0.0, // week change as percent: (delta - 1) * 100 + '%'
  month: 0.0, // month change as percent: (delta - 1) * 100 + '%'
};
```
