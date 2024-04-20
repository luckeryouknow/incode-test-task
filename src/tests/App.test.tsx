import '@testing-library/jest-dom'
import {screen, waitFor} from '@testing-library/react';
import App from "../App.tsx";
import {render} from "./testUtils.tsx";

describe('App', () => {
  it('renders input correctly', () => {
    render(
      <App />
    )

    const input = screen.getByTestId("FindInput");
    expect(input).toBeInTheDocument();
  });

  it('renders button correctly ', () => {
    render(
      <App />
    )

    const button = screen.getByTestId("FindButton");
    expect(button).toBeInTheDocument();
  });

  it('renders columns correctly', async () => {
    render(
      <App />
    )

    const columns = [
      screen.getByTestId(/todo tasks/i),
      screen.getByTestId(/in progress/i),
      screen.getByTestId(/done/i)
    ];
    await waitFor(() => {
      columns.forEach(column => {
        expect(column).toBeInTheDocument();
      })
    })
  })
})