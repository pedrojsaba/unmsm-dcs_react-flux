import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";
import ProfessorList from "./ProfessorList";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        onChange={props.onChange}
        value={props.course.title}
        error={props.errors.title}
      />
      <div className="form-group">
        <label htmlFor="author">Professor</label>
        <div className="field">
          <ProfessorList course={props.course} onChange={props.onChange}></ProfessorList>          
        </div>
        {props.errors.professorId && (
          <div className="alert alert-danger">{props.errors.professorId}</div>
        )}
      </div>

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />


      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default CourseForm;