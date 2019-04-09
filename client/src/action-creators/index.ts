// lib
import { Dispatch } from "redux";
import axios from "axios";
import message from "antd/lib/message";

// src
import * as ActionTypes from "../action-types/index";
import { GistWithFiles } from "../application-state";

const apiUrl = "http://localhost:5000/api";
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.data.token = getGitHubUserFromLocalStorage().token;
    config.data.username = getGitHubUserFromLocalStorage().username;
    console.log("Request body ", config.data);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    console.log("Response OK");
    return response;
  },
  function(error) {
    // handle 400 and 500 errors
    if (error.response.status >= 400)
      console.log("Logging the error ", error.response.status);
    return;
  }
);

function getGitHubUserFromLocalStorage() {
  const localStorageItem = localStorage.getItem("gitHubUser") || "";
  const gitHubUser = JSON.parse(localStorageItem);
  return gitHubUser;
}
export function updateLocalStorage(code: string) {
  return (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading: true
    });
    fetch("http://localhost:9999/authenticate/" + code)
      .then(function(data) {
        return data.json();
      })
      .then(function(res) {
        const { token = "" } = res;
        const options = {
          token
        };
        console.log("Options,", options);
        fetch(`${apiUrl}/getuser`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(options)
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            console.log("response", response);
            const { username, avatar_url } = response;
            // update local storage
            var gitHubUser = {
              token,
              username,
              avatar_url,
              isAuthenticated: true
            };
            localStorage.setItem("gitHubUser", JSON.stringify(gitHubUser));
            // update is Authenticated in store
            dispatch({
              type: ActionTypes.UPDATE_IS_AUTHENTICATED,
              isAuthenticated: true
            });
            console.log("Login Success!");
          })
          .catch(err => {
            message.error("Couldn't get user profile.");
            console.log("Error while getting user profile.", err);
          });
        // axios
        //   .post(`${apiUrl}/getuser`, options)
        //   .then(function(response) {
        // const { username, avatar_url } = response.data;
        // // update local storage
        // var gitHubUser = {
        //   token,
        //   username,
        //   avatar_url,
        //   isAuthenticated: true
        // };
        // localStorage.setItem("gitHubUser", JSON.stringify(gitHubUser));
        // // update is Authenticated in store
        // dispatch({
        //   type: ActionTypes.UPDATE_IS_AUTHENTICATED,
        //   isAuthenticated: true
        // });
        // console.log("Login Success!");
        // })
        // .catch(function(error) {
        //   message.error("Couldn't get user profile.");
        //   console.log("Error while getting user profile.", error);
        // });
      })
      .catch(function(err) {
        message.error("Couldn't get access token. Login failed.");
      });
  };
}

export function updateIsLoading(isLoading: boolean) {
  return (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading
    });
  };
}
export function removeSelectedGist() {
  return (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: ActionTypes.UPDATE_SELECTED_GIST,
      selectedGist: {}
    });
  };
}

export function updateGists() {
  return (dispatch: Dispatch, getState: any) => {
    // updated isLoading
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading: true
    });
    // post to api to get all gists of a user
    axios
      .post(`${apiUrl}/gists`, {})
      .then(function(response) {
        console.log("Gists fetch successful!");
        dispatch({
          type: ActionTypes.UPDATE_GISTS,
          gists: response.data
        });
      })
      .catch(function(error) {
        message.error("No gists found!");
      });
  };
}

export function deleteGist(id: string) {
  // const gitHubUser = getGitHubUserFromLocalStorage();

  return (dispatch: Dispatch, getState: any) => {
    // update isLoading
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading: true
    });
    // const { token = "" } = gitHubUser;
    const options = {
      // token,
      id
    };
    // delete gist
    axios
      .post(`${apiUrl}/deleteGist`, options)
      .then(function(response) {
        const { data: id } = response;
        console.log("Gist deleted successfully.");
        dispatch({
          type: ActionTypes.DELETE_GIST,
          id
        });
      })
      .catch(function(error) {
        message.error("Gist could't be deleted.");
      });
  };
}

export function deleteFile(id: string, fileName: string) {
  return (dispatch: Dispatch, getState: any) => {
    // const gitHubUser = getGitHubUserFromLocalStorage();
    // const { token = "" } = gitHubUser;
    const options = {
      // token,
      id,
      fileName
    };
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading: true
    });
    axios
      .post(`${apiUrl}/deleteFile`, options)
      .then(function(response) {
        console.log("File deleted successfully");
        const { data: fileName } = response;
        dispatch({
          type: ActionTypes.DELETE_FILE,
          fileName
        });
      })
      .catch(function(error) {
        message.error(`Couldn't delete file ${fileName}`);
      });
  };
}
export function editFile(
  id: string,
  oldFileName: string,
  updatedFileName: string,
  fileContent: string
) {
  return (dispatch: Dispatch, getState: any) => {
    // const gitHubUser = getGitHubUserFromLocalStorage();
    // const { token = "" } = gitHubUser;
    const options = {
      // token,
      id,
      oldFileName,
      updatedFileName,
      fileContent
    };
    axios
      .post(`${apiUrl}/editFiles`, options)
      .then(function(response) {
        console.log("File edited successfully");
        const { data: file } = response;
        const data = {
          id,
          file,
          oldFileName
        };
        dispatch({
          type: ActionTypes.EDIT_FILE,
          data
        });
      })
      .catch(function(error) {
        console.log("Error", error);
        message.error(`Couldn't edit file ${oldFileName}`);
      });
  };
}

export function editGist(id: string, description: string) {
  return (dispatch: Dispatch, getState: any) => {
    // const gitHubUser = getGitHubUserFromLocalStorage();
    // update isLoading
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading: true
    });
    // const { token = "" } = gitHubUser;
    const options = {
      // token,
      id,
      description
    };
    axios
      .post(`${apiUrl}/editGist`, options)
      .then(function(response) {
        console.log("Successfully updated gist.");
        const gist = { id: response.data, description };
        dispatch({
          type: ActionTypes.EDIT_GIST,
          gist
        });
      })
      .catch(function(error) {
        message.error(`Couldn't edit gist ${description}`);
      });
  };
}

export function createGist(name: string) {
  return (dispatch: Dispatch, getState: any) => {
    // const gitHubUser = getGitHubUserFromLocalStorage();
    // show loading spinner, set isLoading to true
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading: true
    });
    // const { token = "" } = gitHubUser;
    const options = {
      // token,
      name
    };
    axios
      .post(`${apiUrl}/createGist`, options)
      .then(function(response) {
        console.log("Success! - New gist created.");
        const { data = {} } = response;
        dispatch({
          type: ActionTypes.CREATE_GIST,
          gist: data
        });
      })
      .catch(function(error) {
        message.error(`Couldn't create gist ${name}`);
      });
  };
}

export function getFiles(id: string) {
  return (dispatch: Dispatch, getState: any) => {
    const { gistWithFiles = [] } = getState();
    console.log("Looking in existing files.");
    const selectedGist = gistWithFiles.find((g: GistWithFiles) => g.id == id);
    // show gist from store, if exists and return
    if (selectedGist) {
      dispatch({
        type: ActionTypes.UPDATE_SELECTED_GIST,
        selectedGist
      });
      return;
    }
    // Get gist from API
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading: true
    });

    // const gitHubUser = getGitHubUserFromLocalStorage();
    // const { token } = gitHubUser;
    const options = {
      // token: token,
      id: id
    };
    console.log("Fetching from api...");
    axios
      .post(`${apiUrl}/files`, options)
      .then(function(response) {
        const { data: selectedGist } = response;
        dispatch({
          type: ActionTypes.GET_FILES,
          selectedGist
        });
      })
      .catch(function(error) {
        console.log("Gist not found");
        message.error(`Gist not found`);
        dispatch({
          type: ActionTypes.UPDATE_SELECTED_GIST,
          selectedGist: {}
        });
      });
  };
}
