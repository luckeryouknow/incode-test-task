import {render} from "./testUtils.tsx";
import App from "../App.tsx";
import {fireEvent, screen, waitFor} from "@testing-library/react";

describe("Column", () => {
  it("Column should be filled", async () => {
    render(
      <App />
    )
    const button = screen.getByTestId("FindButton");
    const input = screen.getByTestId("FindInput");
    fireEvent.change(input!, { target: { value: "https://github.com/facebook/react" } });
    fireEvent.click(button);

    const sortables = [
      screen.getByTestId(/todo tasks sortable/i),
      screen.getByTestId(/in progress sortable/i),
      screen.getByTestId(/done sortable/i)
    ];

    await waitFor(() => {
      sortables.forEach(sortable => {
        expect(sortable).not.toBeEmptyDOMElement();
      })
    })
  })
})