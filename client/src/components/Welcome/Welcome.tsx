// lib
import { connect } from "react-redux";
import { Dispatch } from "redux";
import React, { Component } from "react";
import GitHubLogin from "react-github-login";
import { Spin, Button } from "antd";
// src
import { ApplicationState } from "../../application-state";
import {
  updateLocalStorage,
  updateIsLoading,
  updateGists
} from "../../action-creators/index";
import "./Welcome.css";
import { auth } from "../utils/utils";
import {
  WelcomeDispatchProps,
  WelcomeStateProps,
  WelcomeProps
} from "../types";

class Welcome extends Component<WelcomeProps> {
  componentDidMount() {
    // when user goes to localhost:3000/, then
    // if user is authenticated, navigate to notebooks page
    if (auth.isSignedIn()) {
      const { updateGists } = this.props;
      updateGists();
      this.props.history.push("/notebooks");
    }
  }
  componentDidUpdate() {
    // if user is authenticated, navigate to notebooks page
    // this is called when the compoenent is rerendered after signing in
    if (auth.isSignedIn()) {
      this.props.history.push("/notebooks");
    }
  }
  // please disable popup blocker
  onSuccess = (response: any) => {
    const { code } = response;
    const { updateLocalStorage } = this.props;
    updateLocalStorage(code);
  };
  onFailure = (response: any) => {
    console.log(
      "Error while getting code from GitHub. Please try again later.",
      response
    );
  };

  render() {
    const CLIENT_ID = "92bfb1aa190ee8615b78";
    const REDIRECT_URI = "http://localhost:3000/redirect";
    const { isLoading } = this.props;
    return (
      <React.Fragment>
        <div id="welcome">
          <Spin spinning={isLoading}>
            <GitHubLogin
              clientId={CLIENT_ID}
              onSuccess={this.onSuccess}
              onFailure={this.onFailure}
              redirectUri={REDIRECT_URI}
              scope="user,gist"
            />
            <div className="voffset1">
              <h6 id="heading">
                Please disable any pop-up blockers before signing in.
              </h6>
            </div>
          </Spin>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(
  state: ApplicationState,
  ownProps: any
): WelcomeStateProps {
  const { isLoading } = state;
  return {
    ownProps,
    isLoading
  };
}
// remove username, avatarurl, is authenticated from state

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: any
): WelcomeDispatchProps {
  return {
    history: ownProps.history,
    updateLocalStorage: async (code: string) => {
      await dispatch(updateLocalStorage(code));
    },
    updateIsLoading: async (isLoading: boolean) => {
      await dispatch(updateIsLoading(isLoading));
    },
    updateGists: async () => {
      await dispatch(updateGists());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
