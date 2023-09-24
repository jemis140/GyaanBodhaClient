import * as actionTypes from "./notebookActionTypes";

// Action creators
export const createNotebook = (notebookData) => {
  return {
    type: actionTypes.CREATE_NOTEBOOK,
    payload: notebookData,
  };
};

export const updateNotebook = (notebookId, notebookData) => {
  return {
    type: actionTypes.UPDATE_NOTEBOOK,
    payload: { notebookId, notebookData },
  };
};

export const deleteNotebook = (notebookId) => {
  return {
    type: actionTypes.DELETE_NOTEBOOK,
    payload: notebookId,
  };
};

export const getNotebook = (notebookId) => {
  return {
    type: actionTypes.GET_NOTEBOOK,
    payload: notebookId,
  };
};
