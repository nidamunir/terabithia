// lib
import React from "react";
import { Layout, Menu } from "antd";
const { Header } = Layout;
import { Link, withRouter } from "react-router-dom";

// src
import logo from "./github-gist.png";
import "./Navbar.css";
import { auth } from "../utils/utils";
export const Navbar = withRouter(({ history }) => {
  const signOut = () => {
    console.log("Signing out!");
    var gitHubUser = {
      isAuthenticated: false
    };
    localStorage.setItem("gitHubUser", JSON.stringify(gitHubUser));
    history.push("/");
  };

  return (
    <Header>
      <img src={logo} alt="logo" id="logo" />
      {auth.isSignedIn() && (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px", float: "right" }}
        >
          <Menu.Item key="2">
            <a href="#">
              <img
                src={auth.getUser().avatar_url}
                id="avatar"
                className="hoffset"
              />
              {"    "}
              {auth.getUser().username}!
            </a>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/notebooks">Notebooks</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/search">Search</Link>
          </Menu.Item>

          <Menu.Item key="5">
            <Link to="/" onClick={signOut}>
              Sign out
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </Header>
  );
});
