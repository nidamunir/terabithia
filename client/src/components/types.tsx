import { Gist, ApplicationState, GistWithFiles } from "../application-state";

//  all notebook props
export interface NotebookProps {
  gists: Array<Gist>;
  history: any;
  isLoading: boolean;
  updateGists: () => void;
  deleteGist: (id: string) => void;
  editGist: (id: string, dscription: string) => void;
  createGist: (id: string) => void;
}
// get state and dispatch props from notebook props
export type NoteBookDispatchProps = Pick<
  NotebookProps,
  "updateGists" | "deleteGist" | "createGist" | "editGist"
>;
export type NoteBookStateProps = Pick<
  NotebookProps,
  "gists" | "history" | "isLoading"
>;

export type SearchState = {
  query: string;
  visible: boolean;
};
export type SearchProps = {
  gistWithFiles: Array<GistWithFiles>;
  isLoading: boolean;
  selectedGist: GistWithFiles;
  getFiles: (id: string) => void;
  removeSelectedGist: () => void;
};

export type SearchStateProps = Pick<
  SearchProps,
  "gistWithFiles" | "isLoading" | "selectedGist"
>;
export type SearchDispatchProps = Pick<
  SearchProps,
  "getFiles" | "removeSelectedGist"
>;
//  all files props
export interface FileProps {
  location: any;
  selectedGist: ApplicationState["selectedGist"];
  isLoading: boolean;
  gistWithFiles: Array<GistWithFiles>;
  getFiles: (id: string) => void;
  deleteFile: (id: string, fileName: string) => void;
  updateIsLoading: (isLoading: boolean) => void;
  editFile: (
    id: string,
    oldFileName: string,
    updatedFileName: string,
    fileContent: string
  ) => void;
}
export type FileStateProps = Pick<
  FileProps,
  "location" | "selectedGist" | "isLoading" | "gistWithFiles"
>;
export type FileDispatchProps = Pick<
  FileProps,
  "getFiles" | "deleteFile" | "updateIsLoading" | "editFile"
>;

export type FileState = {
  fileName: string;
  fileContent: string;
  visible: boolean;
  gistId: string;
  oldFileName: string;
  isEditMode: boolean;
};

// welcome

export interface WelcomeProps {
  history: any;
  ownProps: any;
  isLoading: boolean;
  updateLocalStorage: (code: string) => void;
  updateIsLoading: (isLoading: boolean) => void;
  updateGists: () => void;
}
// pick
export type WelcomeStateProps = Pick<WelcomeProps, "ownProps" | "isLoading">;
export type WelcomeDispatchProps = Pick<
  WelcomeProps,
  "history" | "updateGists" | "updateLocalStorage" | "updateIsLoading"
>;
