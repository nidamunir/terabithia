// lib
import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { Input, Spin } from "antd";
import { Dispatch } from "redux";
import { Table, Modal, message, Alert } from "antd";
// src
import { getFiles, removeSelectedGist } from "../../action-creators/index";
import { ApplicationState, GistWithFiles, File } from "../../application-state";
import {
  SearchDispatchProps,
  SearchState,
  SearchProps,
  SearchStateProps
} from "../types";

const Search = Input.Search;

class SearchGists extends React.Component<SearchProps, SearchState> {
  columns = [
    { title: "Name", dataIndex: "name", key: "name" },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text: string, record: File) => (
        <a onClick={() => this.showGistUrl(record)}>Share</a>
      )
    }
  ];

  showGistUrl = (gist: any) => {
    const { raw_url } = gist;
    Modal.success({
      title: "Share",
      content: raw_url
    });
  };

  state: SearchState = {
    query: "",
    visible: false
  };

  handleSearch = (query: string) => {
    this.setState({ visible: true });
    const { getFiles } = this.props;
    getFiles(query);
  };

  componentDidMount() {
    // empty selected gist
    const {
      selectedGist: { files = [] } = {},
      removeSelectedGist
    } = this.props;
    removeSelectedGist();
  }
  componetDidUpdate() {
    const { isLoading, selectedGist: { files = [] } = {} } = this.props;
    this.setState({ visible: false });
  }
  render() {
    const { isLoading, selectedGist: { files = [] } = {} } = this.props;
    return (
      <React.Fragment>
        <div className="voffset3">
          <Spin spinning={isLoading}>
            <Search
              placeholder="Search gists."
              onSearch={value => this.handleSearch(value)}
              enterButton
            />

            <Table
              className="voffset1"
              columns={this.columns}
              rowKey="raw_url"
              expandedRowRender={record => (
                <p style={{ margin: 0 }}>{record.content}</p>
              )}
              dataSource={files}
            />
          </Spin>
        </div>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state: ApplicationState): SearchStateProps {
  const { gistWithFiles, isLoading, selectedGist } = state;
  return {
    gistWithFiles,
    isLoading,
    selectedGist
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): SearchDispatchProps {
  return {
    getFiles: async (id: string) => {
      await dispatch(getFiles(id));
    },
    removeSelectedGist: async () => {
      await dispatch(removeSelectedGist());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchGists);
