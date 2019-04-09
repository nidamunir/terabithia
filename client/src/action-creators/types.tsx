import * as ActionTypes from "../action-types/index";
import {
  ApplicationState,
  Gist,
  GistWithFiles,
  File
} from "../application-state";

// export type updateGreeting = typeof updateGreeting;
// export type updateIsLoading = typeof updateIsLoading;
// export type increment = typeof increment;
// export type updateLocalStorage = typeof updateLocalStorage;
// export type updateGists = typeof updateGists;
// export type deleteGist = typeof deleteGist;
// export type editGist = typeof editGist;
// export type createGist = typeof createGist;

export type UpdateLocalStorage = {
  type: ActionTypes.UPDATE_LOCAL_STORAGE;
  user: { username: string; avatar: string; token: string };
};
export type UpdateIsAuthenticatedAction = {
  type: ActionTypes.UPDATE_IS_AUTHENTICATED;
  isAuthenticated: boolean;
};
export type UpdateGistsAction = {
  type: ActionTypes.UPDATE_GISTS;
  gists: [];
};

export type DeleteGistAction = {
  type: ActionTypes.DELETE_GIST;
  id: string;
};
export type UpdateSelectedGistAction = {
  type: ActionTypes.UPDATE_SELECTED_GIST;
  selectedGist: GistWithFiles;
};
export type DeleteFileAction = {
  type: ActionTypes.DELETE_FILE;
  fileName: string;
};
export type GetFilesAction = {
  type: ActionTypes.GET_FILES;
  selectedGist: ApplicationState["selectedGist"];
};

export type CreateGistAction = {
  type: ActionTypes.CREATE_GIST;
  gist: Gist;
};
export type RemoveSelectedGist = {
  type: ActionTypes.UPDATE_SELECTED_GIST;
  selectedGist: any;
};
export type EditGistAction = {
  type: ActionTypes.EDIT_GIST;
  gist: Gist;
};
export type EditFileAction = {
  type: ActionTypes.EDIT_FILE;
  data: { id: string; file: File; oldFileName: string };
};

export type UpdateIsLoadingAction = {
  type: ActionTypes.UPDATE_IS_LOADING;
  isLoading: boolean;
};
