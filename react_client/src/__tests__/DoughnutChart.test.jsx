import { render, waitFor, screen } from "@testing-library/react";
import DoughnutChart from "./DoughnutChart";
import lcwCryptoAPI from "../api/livecoinwatchAPI";
import expressQueryAPI from "../api/expressQueryAPI";
import lcwRemainingCredits from "../api/lcwRemainingCredits";

jest.mock("../api/livecoinwatchAPI");
jest.mock("../api/expressQueryAPI");
jest.mock("../api/lcwRemainingCredits");

describe("DoughnutChart", () => {
  beforeEach(() => {
    // Mock the API calls
    lcwCryptoAPI.mockResolvedValue(/* Mocked crypto data */);
    expressQueryAPI.mockResolvedValue(/* Mocked express data */);
    lcwRemainingCredits.mockResolvedValue(/* Mocked remaining credits */);
  });

  it("renders the loading animation initially", () => {
    render(<DoughnutChart />);
    expect(screen.getByTestId("spin-animation")).toBeInTheDocument();
  });

  it("renders the doughnut chart with data after loading", async () => {
    render(<DoughnutChart />);

    await waitFor(() => {
      expect(screen.queryByTestId("spin-animation")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });
});
