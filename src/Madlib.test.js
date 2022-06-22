import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Madlib from "./Madlib";


describe("Madlib Tests", () => {
    /** mocks madlib content */
    function testContent(){
      return "testing madlib content.";
    }

  /** Smoke Test */
  it("renders without crashing", function () {
    render(
      <Madlib
        generate={jest.fn}
        toggleForm={jest.fn}
      />);
  });

  /** Snapshot Test */
  it("snapshot", function () {
    const { container } = render(
      <Madlib
        generate={jest.fn}
        toggleForm={jest.fn}
      />);
    expect(container).toMatchSnapshot();
  });

  test("renders content", () => {
    const { container } = render(
      <Madlib
        generate={testContent}
        toggleForm={jest.fn}
      />);

      expect.assertions(2);
      expect(container.querySelector("#madlib").dataset.testId)
        .toEqual("madlib");
      expect(container.querySelector("#content").innerHTML)
        .toEqual("testing madlib content.")
    });

    test("renders restart button", () => {
      const { container } = render(
        <Madlib
          generate={testContent}
          toggleForm={jest.fn}
        />);

        expect(container.querySelector("#restart")).toBeInTheDocument()
      });
});