/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import WordsForm from "./Display";


const testMadlib = {
  "title": "Hello Test!",
  "blanks": ["noun", "adverb", "verb"],
  "value": ["Hello, ", " are you ", " operational?", 0]
};

const update = jest.fn();
const toggleForm = jest.fn();

describe("WordForm Tests", () => {

  test('renders without crashing', () => {
    render(
      <WordsForm
        madlib={testMadlib}
        update={update}
        toggleForm={toggleForm}
      />);
  });

  test('matches snapshot', () => {
    const { container } = render(
      <WordsForm
        madlib={testMadlib}
        update={update}
        toggleForm={toggleForm}
      />);
    expect(container).toMatchSnapshot();
  });

  test('Form renders correctly', () => {
    const { container, queryByText, getByText } = render(
      <WordsForm
        madlib={testMadlib}
        update={update}
        toggleForm={toggleForm}
      />);
    expect(container.querySelector("h2").innerHTML).toEqual("Hello Test!");
    expect(container.querySelectorAll("input").length).toBe(3)

    //fun fact: test suite advises getBy methods for inclusive tests
    //and queryBy methods for exclusive tests.
    //https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-presence-queries.md
    expect(getByText("noun:")).toBeInTheDocument();
    expect(getByText("adverb:")).toBeInTheDocument();
    expect(getByText("verb:")).toBeInTheDocument();
    expect(queryByText("restart")).not.toBeInTheDocument();
    expect(queryByText("operational?")).not.toBeInTheDocument();
  });

  test("button deactivated on load", () => {
    const { container } = render(
      <WordsForm
        madlib={testMadlib}
        update={update}
        toggleForm={toggleForm}
      />);
    const submitBtn = container.querySelector("button");
    expect(submitBtn.dataset.testState).toEqual("disabled");
  })

  test("button activates when form completed", () => {
    const { container, getByLabelText } = render(
      <WordsForm
        madlib={testMadlib}
        update={update}
        toggleForm={toggleForm}
      />);

    const nounInput = getByLabelText("noun:");
    const adverbInput = getByLabelText("adverb:");
    const verbInput = getByLabelText("verb:");

    fireEvent.change(nounInput, { target: { value: "test" } });
    fireEvent.change(adverbInput, { target: { value: "test" } });
    fireEvent.change(verbInput, { target: { value: "test" } });

    /* BUG: My validateForm fn needs one additional change event after
    all fields have values before enabling submit btn. This would
    be an issue only if a user wanted to submit a 1 letter word in
    the last field. will resolve bug if I have time. */
    const submitBtn = container.querySelector("button");
    expect(submitBtn.dataset.testState).toEqual("disabled");

    fireEvent.change(verbInput, { target: { value: "testy" } });
    expect(submitBtn.dataset.testState).toEqual("enabled");

  })

});
