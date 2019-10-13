import React, { useState, useEffect } from "react";
import profesorStore from "../stores/professorStore";
import { loadProfessors } from "../actions/courseActions";

function ProfessorList(props) {
  const [professors, setProfessors] = useState(profesorStore.getProfessors());

  useEffect(() => {
    profesorStore.addChangeListener(onChange);
    if (profesorStore.getProfessors().length === 0) loadProfessors();
    return () => profesorStore.removeChangeListener(onChange); // cleanup on unmount (navigate to a different page)
  }, []);

  function onChange() {
    //debugger;
    setProfessors(profesorStore.getProfessors());
  }

  return (
    <select
      id="professor"
      name="professorId"
      onChange={props.onChange}
      className="form-control"
      value={props.course.professorId || ""}>
      <option value="" />
      {professors.map(course => {
        return (
          <option key={course.id} value={course.id}>{course.name}</option>
        );
      })}
    </select>
  );
}

export default ProfessorList;