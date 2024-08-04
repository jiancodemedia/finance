import { render, screen } from "@testing-library/react";
import App from "../Home";

test("renders learn react link", () => {
  const decrement = jest.fn();
  const increment = jest.fn();
  const changeName = jest.fn();
  render(
    <App
      count={1}
      name=""
      decrement={decrement as any}
      increment={increment as any}
      changeName={changeName as any}
    />
  );
  const linkElement = screen.getByText(/1/i);
  expect(linkElement).toBeInTheDocument();
});
