import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  const decrement = jest.fn();
  const increment = jest.fn();
  const incrementByAmount = jest.fn();
  render(
    <App
      count={1}
      decrement={decrement as any}
      increment={increment as any}
      incrementByAmount={incrementByAmount as any}
    />
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
