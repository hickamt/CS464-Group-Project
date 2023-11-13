import { render, waitFor, screen } from "@testing-library/react";
import Table from "../components/table/Table"; // Adjust the import path as needed
import expressQueryAPI from "../api/expressQueryAPI";
import lcwCryptoAPI from "../api/livecoinwatchAPI";
import lcwRemainingCredits from "../api/lcwRemainingCredits";

jest.mock("../api/livecoinwatchAPI");
jest.mock("../api/expressQueryAPI");
jest.mock("../api/lcwRemainingCredits");

describe("Table", () => {
  beforeEach(() => {
    // Mock the API calls
    lcwCryptoAPI.mockResolvedValue(/* Mocked crypto data */);
    expressQueryAPI.mockResolvedValue(/* Mocked express data */);
    lcwRemainingCredits.mockResolvedValue(/* Mocked remaining credits */);
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
