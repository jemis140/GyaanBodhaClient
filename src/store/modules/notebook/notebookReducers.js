import * as actionTypes from "./notebookActionTypes";

const initialState = {
  notebooks: [],
};

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_NOTEBOOK:
      return {
        ...state,
        notebooks: [...state.notebooks, action.payload],
      };
    case actionTypes.UPDATE_NOTEBOOK:
      return state; // Modify according to your logic
    case actionTypes.DELETE_NOTEBOOK:
      return state; // Modify according to your logic
    case actionTypes.GET_NOTEBOOK:
      return state; // Modify according to your logic
    default:
      return state;
  }
};

export default notebookReducer;
