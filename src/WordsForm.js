import React, { useState } from "react";

/** */
function WordsForm({ madlib, update, toggleForm }) {


  const [fieldsComplete, setFieldsComplete] = useState(false);
  const [formData, setFormData] = useState({});


  /** Sets state for formData, validates all fields present for submission */
  function handleChange(evt) {
    validateFields();
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }


  //Bug: Doesn't update until the second change on the last input.
  //Bug: something is causing uncontrolled message in console. It began
  //when I added the validation fn.
  /**
   * limited form validation. checks formData length matches blanks length
   * and content each field has length
   */
  function validateFields() {
    const formValues = Object.values(formData);
    const allFieldsEntered = formValues.length === madlib.blanks.length;
    const validContent = formValues.every((element) => element.length > 0);
    setFieldsComplete(() => (allFieldsEntered && validContent));
  }


  /** On submit, add values from formData to the madlib currently in state */
  function handleSubmit(evt) {
    evt.preventDefault();
    const words = Object.values(formData);
    update(words);
    toggleForm();
  }


  //builds form with 'madlib.blanks' prop.
  const form = madlib.blanks.map((field, i) => (
    <div key={`${field}-${i}`}>
      <label
        htmlFor={`${i}-${field}`}
        className="col-form-label">
        {field}:
      </label>

      <input
        id={`${i}-${field}`}
        name={`${i}-${field}`}
        className="form-control"
        placeholder={field}
        onChange={handleChange}
        value={formData[`${i}-${field}`]}
        aria-label={`${i}-${field}`}
      />
    </div>
  ));


  //submit buttons. I tried doing the ternary inside the button attributes,
  //couldn't get it to work.
  const submitDisabled = <button type="submit" data-test-state="disabled" className="btn btn-primary mb-3" disabled>Submit</button>;
  const submitActive = <button type="submit" data-test-state="enabled" className="btn btn-primary mb-3">Submit</button>;


  return (
    <div className="container mb-3">
      <h2>{madlib.title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {form}
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          {fieldsComplete ? submitActive : submitDisabled}
        </div>
      </form>
    </div>
  );
}

export default WordsForm;