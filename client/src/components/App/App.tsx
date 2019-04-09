// lib
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "antd";
const { Footer, Content } = Layout;
// src
import Welcome from "../Welcome/Welcome";
import NotebookList from "../NotebookList/NotebookList";
import FilesList from "../FilesList/FilesList";
import { PrivateRoute } from "./PrivateRoute";
import Search from "../Search/Search";
import { Navbar } from "../Navbar/Navbar";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Layout>
            <Navbar />
            <Content>
              <div
                style={{
                  height: "calc(100vh - 55px)",
                  padding: "0px 40px",
                  width: "90%",
                  margin: "auto"
                }}
              >
                <Switch>
                  <Route path="/login" component={Welcome} />
                  <Route path="/search" component={Search} />
                  <PrivateRoute path="/notebooks" component={NotebookList} />
                  <PrivateRoute path="/files" component={FilesList} />
                  <Route path="/" component={Welcome} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Created by Nida M.</Footer>
          </Layout>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
