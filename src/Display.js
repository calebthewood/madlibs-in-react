import React, { useState } from "react";
import WordsForm from "./WordsForm";
import Madlib from "./Madlib";

function Display({madlib, update, generate}) {
  const [formShowing, setFormShowing] = useState(true);


  return (
    <div id="madlibDisplay">
      {formShowing ?
        <WordsForm
          madlib={madlib}
          update={update}
          toggleForm={()=> setFormShowing(false)}
        />
        :
        <Madlib
          title={madlib.title}
          generate={generate}
          toggleForm={()=> setFormShowing(true)}
          />}
    </div>
  );
}

export default Display;