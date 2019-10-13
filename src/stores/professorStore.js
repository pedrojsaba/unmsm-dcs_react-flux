import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _professors = [];

class ProfessorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getProfessors() {
    return _professors;
  }

  getProfessorBySlug(slug) {
    return _professors.find(professor => professor.slug === slug);
  }
}

const store = new ProfessorStore();

Dispatcher.register(action => {
  switch (action.actionType) {    
    case actionTypes.LOAD_PROFESSORS:
      _professors = action.professors;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});

export default store;