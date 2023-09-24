import * as actionTypes from "./notebookActionTypes";
import {
  createNotebook,
  updateNotebook,
  deleteNotebook,
  getNotebook,
} from "./notebookActions";
import NotebookService from "path/to/NotebookService"; // Update with the correct path

const notebookService = new NotebookService("notebook-module");

export const createNotebookThunk = (notebookData) => {
  return async (dispatch) => {
    try {
      const notebook = new Notebook({ ...notebookData, id: uuidv4() }); // Assuming you have uuidv4 function available
      await notebookService.create_notebook(notebook);
      dispatch(createNotebook(notebook));
    } catch (error) {
      console.error("Error creating notebook:", error);
    }
  };
};

export const updateNotebookThunk = (notebookId, notebookData) => {
  return async (dispatch) => {
    try {
      const notebook = await notebookService.get_notebook(notebookId);
      if (notebook) {
        notebook.name = notebookData.name;
        notebook.description = notebookData.description;
        notebook.tags = notebookData.tags;
        await notebookService.update_notebook(notebook);
        dispatch(updateNotebook(notebookId, notebookData));
      }
    } catch (error) {
      console.error("Error updating notebook:", error);
    }
  };
};

export const deleteNotebookThunk = (notebookId) => {
  return async (dispatch) => {
    try {
      await notebookService.delete_notebook(notebookId);
      dispatch(deleteNotebook(notebookId));
    } catch (error) {
      console.error("Error deleting notebook:", error);
    }
  };
};

export const getNotebookThunk = (notebookId) => {
  return async (dispatch) => {
    try {
      const notebook = await notebookService.get_notebook(notebookId);
      if (notebook) {
        dispatch(getNotebook(notebook));
      }
    } catch (error) {
      console.error("Error getting notebook:", error);
    }
  };
};
