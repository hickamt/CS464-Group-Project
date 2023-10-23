import { getCryptoIcon } from "../../../modules/themes";
import { sortValueHL } from "../../../modules/arraySort";

// Combine userData and cryptoData into one array (GH)
const combineData = function combineDataWithCryptoData(
  userData,
  cryptoData,
  setData
) {
  const temp = [];
  userData.map((data) => {
    const { asset, remaining } = data;
    const { rate, volume, delta } = cryptoData.find(
      (data) => data.code.toUpperCase() === asset.toUpperCase()
    );
    temp.push({
      icon: getCryptoIcon(asset),
      asset: asset,
      remaining: remaining,
      spot: rate,
      value: rate * remaining,
      volume: volume,
      hour: (delta.hour - 1) * 100,
      day: (delta.day - 1) * 100,
      week: (delta.week - 1) * 100,
      month: (delta.month - 1) * 100,
    });
  });
  setData(sortValueHL(temp));
};

export default combineData;
