import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import Card from "../components/card/Card";
import expressQueryAPI from "../api/expressQueryAPI";
import lcwCryptoAPI from "../api/livecoinwatchAPI";
import lcwRemainingCredits from "../api/lcwRemainingCredits";

jest.mock("../api/livecoinwatchAPI");
jest.mock("../api/expressQueryAPI");
jest.mock("../api/lcwRemainingCredits");

describe("Card", () => {
  beforeEach(() => {
    lcwCryptoAPI.mockResolvedValue(/* Mocked crypto data */);
    expressQueryAPI.mockResolvedValue(/* Mocked express data */);
    lcwRemainingCredits.mockResolvedValue(/* Mocked remaining credits */);
  });

  it("renders the loading animation initially", () => {
    render(<Card />);
    expect(screen.getByTestId("spin-animation")).toBeInTheDocument();
  });

  it("renders Card after data is loaded", async () => {
    render(<Card />);
    await waitFor(() => {
      expect(screen.queryByTestId("spin-animation")).not.toBeInTheDocument();
    });

    // Ensure that Card are rendered
    expect(screen.getByTestId("card-row")).toBeInTheDocument();
    // Further assertions can be added here
  });

  it("navigates between Card using arrows", async () => {
    render(<Card />);
    await waitFor(() => {
      expect(screen.queryByTestId("spin-animation")).not.toBeInTheDocument();
    });

    // Simulate clicking the right arrow
    fireEvent.click(screen.getByTestId("arrow-right"));
    // Add assertions to check if the card index has incremented

    // Simulate clicking the left arrow
    fireEvent.click(screen.getByTestId("arrow-left"));
    // Add assertions to check if the card index has decremented
  });
});
