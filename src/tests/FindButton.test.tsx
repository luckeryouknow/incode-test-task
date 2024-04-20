import {render} from "./testUtils.tsx";
import App from "../App.tsx";
import {fireEvent, screen} from "@testing-library/react";
import {store} from "../store/store.tsx";

describe("FindButton", () => {
  it("Button should return server response", () => {
    render(
      <App />
    );
    const button = screen.getByTestId("FindButton");
    fireEvent.click(button);
    const list = store.getState().dragAndDropList;
    expect(list).not.toBeNull();
  })
})