import React, { useState, useEffect } from "react";
import profesorStore from "../stores/professorStore";
import { loadProfessors } from "../actions/courseActions";

function ProfessorName(props) {
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

  function getName(professorId) {
    var p = professors.filter(f => f.id === professorId);
    if (p.length > 0) return p[0].name;
    return 'Not Found';
  }

  return (
    <i>{getName(props.professorId)}</i>
  );
}

export default ProfessorName;