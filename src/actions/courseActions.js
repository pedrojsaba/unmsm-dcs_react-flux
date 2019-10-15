import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import * as professorApi from "../api/professorApi";
import actionTypes from "./actionTypes";
import swal from 'sweetalert';
import { toast } from "react-toastify";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then(savedCourse => {
    // Hey dispatcher, go tell all the stores that a course was just created.
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then(courses => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses
    });
  });
}

export function loadProfessors() {
  return professorApi.getProfessors().then(professors => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_PROFESSORS,
      professors: professors
    });
  });
}

export function deleteCourse(id) {
  //debugger;  
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this course!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      toast.success("Course deleted.");
      return courseApi.deleteCourse(id).then(() => {
        dispatcher.dispatch({
          actionType: actionTypes.DELETE_COURSE,
          id: id
        });
      });    
    } else {
      toast.success("Your course is safe!");
    }
  });
}