import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import professorStore from "../stores/professorStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { loadProfessors } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [professors, setProfessors] = useState(professorStore.getProfessors());
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount (navigate to a different page)
  }, []);

  useEffect(() => {
    professorStore.addChangeListener(onChange);
    if (professorStore.getProfessors().length === 0) loadProfessors();
    return () => professorStore.removeChangeListener(onChange); // cleanup on unmount (navigate to a different page)
  }, []);

  function onChange() {
    //debugger;
    setCourses(courseStore.getCourses());
    setProfessors(professorStore.getProfessors())
  }

  return (
    <><h2>Courses</h2>
      <Link className="btn btn-primary mb-3" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} professors={professors} />
    </>
  );
}

export default CoursesPage;