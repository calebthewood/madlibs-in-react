import React, { useState } from "react";
import Display from "./Display";
import getNumMadlibs from "./data";

/** App for Generating a Madlib.
 *
 * Props:
 * - numChoices: int determining how many madlibs to choose from.
 *
 * State:
 * - madlibs: array of [ madlib, ... ]
 * - madlib: object { blanks: [noun, verb, ...],
 *                    words: [ball, run, ...],
 *                    value: [he, over, the,...],
 *                    title: "Story Title"}
 * - formShowing: boolean tracking selection form
 *
 * App -> MadlibApp -> Display -> WordsForm && Madlib
 */

function MadlibApp({ numChoices = 3}) {

  const newMadlibs = getNumMadlibs(numChoices);
  const [madlibs, setMadlibs] = useState(newMadlibs);
  const [madlib, setMadlib] = useState(false);
  const [formShowing, setFormShowing] = useState(true);


  /** Refresh selection of madlibs */
  function refreshChoices() {
    const freshMadlibs = getNumMadlibs(numChoices);
    setMadlibs(freshMadlibs);
    setFormShowing(true);
  }

  /**
   * Plucks index from the character at index 3 of the value string.
   * ex: middle option of radioField 'ml-1' --> 1
   * sets madlib state.
   * */
  function handleChange(evt) {
    const { value } = evt.target;
    console.log(value)
    const idx = value[3];
    setMadlib(() => madlibs[idx]);
  }
  /** turns off selection form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    setFormShowing(false);
  }


  /**Generate madlib selection field. */
  function madlibsForm(choices) {
    return (
      choices.map((choice, idx) => (
        //using idx here for key here b/c list is static.
        <div key={idx} className="form-check">
          <input
            type="radio"
            name="madlibs"
            value={`ml-${idx}`}
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor={choice.title}>
            {choice.title}
          </label>
        </div>
      ))
    );
  }

  // ******************************************* Consider splitting?

  /** Adds wordlist to Madlib currently in state.
   * called from WordForm
   */
  function updateMadlib(wordData) {
    setMadlib(() => ({ ...madlib, words: wordData }));
  }
  /**Joins value array of phrases with user generated words array
   * called from Madlib.
   * returns madlib content.
   */
  function generateMadlib() {
    const { value, words } = madlib;
    const completedMadlib = value.map((phrase, idx) => (
      (phrase || "") + (words[idx] || ""))
    );
    return completedMadlib;
  }

  //render either radioField or Display
  return (
    <div className="container mb-3">
      {formShowing ?
      //note to self: this field should probably be its own component.
        <form onSubmit={handleSubmit}>
          <h2>Madlibs!</h2>
          {madlibsForm(madlibs)}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              type="submit"
              className="btn btn-primary mb-3">
              Start
            </button>
            <button
              onClick={refreshChoices}
              type="button"
              className="btn btn-secondary mb-3">
              Refresh Choices
            </button>
          </div>
        </form>
        :
        <Display
          madlib={madlib}
          update={updateMadlib}
          generate={generateMadlib}
        />}
    </div >

  );
}

export default MadlibApp;