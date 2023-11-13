import { render, waitFor, screen } from "@testing-library/react";
import HistoricalLineChart from "./HistoricalLineChart";
import lcwSingleHistory from "../../api/lcwHistoricalAPI";

jest.mock("../../api/lcwHistoricalAPI");

describe("HistoricalLineChart", () => {
  it("renders without crashing", () => {
    render(<HistoricalLineChart />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("fetches data and updates state correctly", async () => {
    lcwSingleHistory.mockResolvedValueOnce({
      history: [
        { rate: 100, date: "2023-01-01" },
        { rate: 200, date: "2023-01-02" },
      ],
    });

    render(<HistoricalLineChart />);
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/BTC Price in USD/i)).toBeInTheDocument();
  });

  // Additional tests...
});
