import { render, waitFor, screen } from "@testing-library/react";
import Table from "../components/table/Table"; // Adjust the import path as needed
import expressQueryAPI from "../api/expressQueryAPI";
import lcwCryptoAPI from "../api/livecoinwatchAPI";
import lcwRemainingCredits from "../api/lcwRemainingCredits";

const ExpressData = [
  {
    asset: "amp",
    remaining: 0,
  },
  {
    asset: "bal",
    remaining: 0,
  },
  {
    asset: "bnb",
    remaining: 8.70343642860156,
  },
  {
    asset: "bond",
    remaining: 0,
  },
  {
    asset: "btc",
    remaining: 0.12628332,
  },
  {
    asset: "clv",
    remaining: 0,
  },
  {
    asset: "comp",
    remaining: 0,
  },
  {
    asset: "doge",
    remaining: 324.60691196,
  },
  {
    asset: "dot",
    remaining: 473.6851422599,
  },
  {
    asset: "eth",
    remaining: 2.2990129999,
  },
  {
    asset: "fet",
    remaining: 0,
  },
  {
    asset: "forth",
    remaining: 0,
  },
];

const lcwDataMock = {
  dailyCreditsRemaining: 9984,
  dailyCreditsLimit: 10000,
};

const cryptoDataMock = [
  {
    code: "BTC",
    rate: 37387.03848194014,
    volume: 8031774472,
    cap: 730574735242,
    delta: {
      hour: 1.0062,
      day: 1.0097,
      week: 1.0633,
      month: 1.3882,
      quarter: 1.2674,
      year: 2.2139,
    },
  },
  {
    code: "ETH",
    rate: 2070.1835008288554,
    volume: 5841688879,
    cap: 245678422467,
    delta: {
      hour: 1.0133,
      day: 1.0175,
      week: 1.0905,
      month: 1.3314,
      quarter: 1.1185,
      year: 1.6374,
    },
  },
  {
    code: "USDT",
    rate: 1.0011131170591532,
    volume: 33598070351,
    cap: 86901079311,
    delta: {
      hour: 0.9995,
      day: 0.9993,
      week: 0.999,
      month: 1.0003,
      quarter: 1.0007,
      year: 0.9991,
    },
  },
  {
    code: "BNB",
    rate: 249.44926653797813,
    volume: 667213937,
    cap: 37684344848,
    delta: {
      hour: 1.0065,
      day: 1.0063,
      week: 1.0165,
      month: 1.2056,
      quarter: 1.03,
      year: 0.8779,
    },
  },
  {
    code: "USDC",
    rate: 1.0006171955996914,
    volume: 1984717169,
    cap: 24246056482,
    delta: {
      hour: 0.9993,
      day: 0.9985,
      week: 0.9994,
      month: 1,
      quarter: 0.9996,
      year: 1.0007,
    },
  },
  {
    code: "DOGE",
    rate: 0.0788925483583624,
    volume: 696055582,
    cap: 10466734688,
    delta: {
      hour: 1.0154,
      day: 1.0275,
      week: 1.0883,
      month: 1.3457,
      quarter: 1.0546,
      year: 0.8761,
    },
  },
  {
    code: "DOT",
    rate: 5.8024930956842855,
    volume: 385680757,
    cap: 7478932841,
    delta: {
      hour: 1.0242,
      day: 1.0546,
      week: 1.2012,
      month: 1.5575,
      quarter: 1.1622,
      year: 0.9929,
    },
  },
  {
    code: "LUNC",
    rate: 0.00008547216464322621,
    volume: 87661916,
    cap: 558680918,
    delta: {
      hour: 1.0223,
      day: 1.0693,
      week: 1.3011,
      month: 1.4818,
      quarter: 1.0837,
      year: 0.4552,
    },
  },
  {
    code: "COMP",
    rate: 55.98572459269078,
    volume: 394132559,
    cap: 443350897,
    delta: {
      hour: 1.0356,
      day: 1.0595,
      week: 1.111,
      month: 1.3728,
      quarter: 1.0036,
      year: 1.4708,
    },
  },
  {
    code: "FET",
    rate: 0.4368142415326767,
    volume: 109045225,
    cap: 397865263,
    delta: {
      hour: 1.0345,
      day: 1.059,
      week: 1.1733,
      month: 2.0821,
      quarter: 1.9873,
      year: 7.025,
    },
  },
  {
    code: "BAL",
    rate: 4.172167544799178,
    volume: 11347932,
    cap: 224201570,
    delta: {
      hour: 1.0266,
      day: 1.0561,
      week: 1.1258,
      month: 1.3752,
      quarter: 0.9776,
      year: 0.7708,
    },
  },
  {
    code: "AMP",
    rate: 0.002124660527500816,
    volume: 9558892,
    cap: 156200856,
    delta: {
      hour: 1.0045,
      day: 1.0185,
      week: 1.2093,
      month: 1.4659,
      quarter: 0.8815,
      year: 0.5585,
    },
  },
  {
    code: "FORTH",
    rate: 3.5119998318354155,
    volume: 15258835,
    cap: 46466048,
    delta: {
      hour: 1.0244,
      day: 1.0444,
      week: 1.0981,
      month: 1.2849,
      quarter: 1.2102,
      year: 1.1837,
    },
  },
  {
    code: "BOND",
    rate: 4.3328947589218085,
    volume: 15248462,
    cap: 41206054,
    delta: {
      hour: 1.0227,
      day: 1.037,
      week: 1.0161,
      month: 1.4682,
      quarter: 1.4448,
      year: 1.035,
    },
  },
  {
    code: "CLV",
    rate: null,
    volume: null,
    cap: null,
    delta: {
      hour: null,
      day: null,
      week: null,
      month: null,
      quarter: null,
      year: null,
    },
  },
];

jest.mock("../api/livecoinwatchAPI");
jest.mock("../api/expressQueryAPI");
jest.mock("../api/lcwRemainingCredits");

describe("Table", () => {
  beforeEach(() => {
    // Mock the API calls
    lcwCryptoAPI.mockResolvedValue(cryptoDataMock);
    expressQueryAPI.mockResolvedValue(ExpressData);
    lcwRemainingCredits.mockResolvedValue(lcwDataMock);
  });

  it("renders the loading animation initially", () => {
    render(<Table />);
    expect(screen.getByTestId("spin-animation")).toBeInTheDocument();
  });

  it("renders the table with data after loading", async () => {
    render(<Table />);
    await waitFor(() => {
      expect(screen.queryByTestId("spin-animation")).not.toBeInTheDocument();
    });

    // Ensure that the table is rendered
    expect(screen.getByTestId("table")).toBeInTheDocument();
    // Further assertions can be added here to check table contents
  });

  it("displays the correct total row", async () => {
    render(<Table />);
    await waitFor(() => {
      expect(screen.queryByTestId("spin-animation")).not.toBeInTheDocument();
    });

    // Check if the total row is displayed correctly
    const totalRow = screen.getByTestId("total-row"); // Add the appropriate test ID in your component
    expect(totalRow).toBeInTheDocument();
    // Further assertions to check the contents of the total row
  });
});
