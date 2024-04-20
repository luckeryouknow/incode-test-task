import {render} from "./testUtils.tsx";
import App from "../App.tsx";
import {fireEvent, screen} from "@testing-library/react";

describe("LinksToRepo", () => {
  it("Should have links", () => {
    render(
      <App />
    )

    const button = screen.getByTestId("FindButton");
    const input = screen.getByTestId("FindInput");

    fireEvent.change(input, { target: { value: "https://github.com/facebook/react" } });
    fireEvent.click(button);

    const repoOwner = screen.getByTestId("RepoOwner");
    const repo = screen.getByTestId("Repo");

    expect(repoOwner).not.toBeEmptyDOMElement();
    expect(repo).not.toBeEmptyDOMElement();
  })
})