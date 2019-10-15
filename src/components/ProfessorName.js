import React from "react";

function ProfessorName(props) {
  

  function getName(professorId) {
    var p = props.professors.filter(f => f.id === professorId);
    if (p.length > 0) return p[0].name;
    return 'Not Found';
  }

  return (
    <i>{getName(props.professorId)}</i>
  );
}

export default ProfessorName;