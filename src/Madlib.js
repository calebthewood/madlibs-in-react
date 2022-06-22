import React from "react";


function Madlib({ title, generate, toggleForm }) {
  return (
    <div
      id="madlib"
      data-test-id="madlib"
      className="container">

      <h2>{title}</h2>

      <p id="content" className="lead">{generate()}</p>

      <button
        id="restart"
        className="btn btn-primary mb-3"
        onClick={toggleForm}
      >Restart</button>

    </div>
  );
}

export default Madlib;