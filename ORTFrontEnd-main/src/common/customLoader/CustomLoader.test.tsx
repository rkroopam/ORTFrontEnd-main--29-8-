import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // for the `toBeInTheDocument` matcher
import CustomLoader from "../customLoader"; // adjust the import path if necessary

describe("CustomLoader", () => {
  //TC-019
  test("renders the CircularProgress component", () => {
    render(<CustomLoader />);
    const circularProgress = screen.getByRole("progressbar");
    expect(circularProgress).toBeInTheDocument();
  });

  //TC-020
  test("centers the CircularProgress component within the box", () => {
    render(<CustomLoader />);
    const box = screen.getByRole("progressbar").closest("div");
    expect(box).toHaveStyle("display: flex");
    expect(box).toHaveStyle("justify-content: center");
  });

  //TC-021
  test("applies the correct styles to the Box component", () => {
    render(<CustomLoader />);
    const box = screen.getByRole("progressbar").closest("div");
    expect(box).toHaveStyle({ display: "flex", "justify-content": "center" });
  });

  //TC-022
  test("does not render any children other than CircularProgress", () => {
    render(<CustomLoader />);
    // expect(box.children).toHaveLength(1);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  //TC-023
  test("matches the snapshot", () => {
    const { container } = render(<CustomLoader />);
    expect(container).toMatchSnapshot();
  });
});
