import { render, screen } from "@testing-library/react";
import App from "./app";

test("renders app component", () => {
  render(<App />);
  const headingElement = screen.getByText(/МБОУ АЛГОСОШ/i);
  expect(headingElement).toBeInTheDocument();
});
