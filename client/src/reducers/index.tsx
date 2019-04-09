// TODO: Always extract variables where needed
// src
import * as ActionTypes from "../action-types/index";
import * as Actions from "../action-creators/types";

import message from "antd/lib/message";

type Action =
  | Actions.UpdateLocalStorage
  | Actions.UpdateGistsAction
  | Actions.DeleteGistAction
  | Actions.CreateGistAction
  | Actions.GetFilesAction
  | Actions.DeleteFileAction
  | Actions.UpdateIsAuthenticatedAction
  | Actions.UpdateIsLoadingAction
  | Actions.EditGistAction
  | Actions.UpdateSelectedGistAction
  | Actions.EditFileAction
  | Actions.RemoveSelectedGist;
import { ApplicationState, defaultState } from "../application-state";

const updateState = (
  state: ApplicationState = defaultState,
  action: Action
) => {
  const { gists, gistWithFiles, selectedGist: mySelectedGist } = state;

  const { files = [] } = mySelectedGist;

  switch (action.type) {
    case ActionTypes.DELETE_FILE:
      const { fileName } = action;
      const selectedGistCopy = { ...mySelectedGist };
      selectedGistCopy.files = files.filter(f => f.name !== fileName);
      message.success("File deleted!");
      return {
        ...state,
        selectedGist: selectedGistCopy,
        isLoading: false
      };
    case ActionTypes.EDIT_FILE:
      const {
        data: { id: idToEdit, oldFileName, file }
      } = action;
      const gistsWithFilesCopy = gistWithFiles.slice();
      gistsWithFilesCopy.forEach(g => {
        let { id, files } = g;
        if (id === idToEdit) {
          const index = files.findIndex(f => f.name == oldFileName);

          if (index < 0) {
            const filesCopy = [file, ...files];
            g.files = filesCopy;
            message.success("File added!");
          } else {
            files[index] = file;
            message.success("File updated!");
          }
        }
      });
      return {
        ...state,
        isLoading: false,
        gistWithFiles: gistsWithFilesCopy
      };

    case ActionTypes.CREATE_GIST:
      message.success("Gists added!");
      const { gist } = action;
      return {
        ...state,
        gists: [gist, ...gists],
        isLoading: false
      };
    case ActionTypes.UPDATE_IS_AUTHENTICATED:
      const { isAuthenticated } = action;
      return {
        ...state,
        isAuthenticated,
        isLoading: false
      };
    case ActionTypes.UPDATE_SELECTED_GIST:
      const { selectedGist: currentGist } = action;
      return {
        ...state,
        selectedGist: currentGist,
        isLoading: false
      };

    case ActionTypes.UPDATE_IS_LOADING:
      const { isLoading } = action;
      return {
        ...state,
        isLoading
      };

    case ActionTypes.UPDATE_GISTS:
      message.success("Gists updated!");
      return {
        ...state,
        gists: action.gists,
        isLoading: false
      };
    case ActionTypes.UPDATE_LOCAL_STORAGE:
      const { username, avatar, token } = action.user;
      message.success("Login Successful!");

      return {
        ...state,
        username,
        avatar,
        token,
        isAuthenticated: true
      };
    case ActionTypes.DELETE_GIST:
      const { id } = action;
      message.success("Gist Deleted!");
      return {
        ...state,
        gists: gists.filter(g => g.id !== id),
        isLoading: false
      };

    case ActionTypes.EDIT_GIST:
      const {
        gist: { id: editedGistId, description }
      } = action;
      const gistsCopy = gists.slice(); // Create local copy to change.
      gistsCopy.forEach(g => {
        if (g.id === editedGistId) {
          g.description = description;
        }
      });
      message.success("Gist Edited!");

      return {
        ...state,
        gists: gistsCopy,
        isLoading: false
      };
    case ActionTypes.GET_FILES:
      const { selectedGist: g } = action;
      message.success("Files Updated!");

      return {
        ...state,
        selectedGist: g,
        gistWithFiles: [...gistWithFiles, g],
        isLoading: false
      };
    default:
      return state;
  }
};

export default updateState;
