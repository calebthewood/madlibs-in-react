import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Display from "./Display";


const testMadlib = {
  "title": "Hello Test!",
  "blanks": ["noun", "adverb", "verb"],
  "value": ["Hello, ", " are you ", " operational?", 0]
}

const update = jest.fn();
const generate = jest.fn();

/** Smoke Test */
it("renders without crashing", function () {
  render(
    <Display
      madlib={testMadlib}
      update={update}
      generate={generate}
    />);
});

/** Snapshot Test */
it("snapshot", function () {
  const { container } = render(
    <Display
      madlib={testMadlib}
      update={update}
      generate={generate}
    />);

  expect(container).toMatchSnapshot();
});

it("renders", function () {
  const { container } = render(
    <Display
      madlib={testMadlib}
      update={update}
      generate={generate}
    />);
    expect(container.querySelector("#madlibDisplay")).toBeInTheDocument();
});