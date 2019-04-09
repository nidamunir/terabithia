// lib
import { Dispatch } from "redux";
import { connect } from "react-redux";
import React from "react";
import { Table, Divider, Spin, Modal, Button, Input, Icon } from "antd";
// src
import "./NotebookList.css";
import {
  updateGists,
  deleteGist,
  createGist,
  editGist
} from "../../action-creators/index";
import { ApplicationState, Gist } from "../../application-state";
import {
  NoteBookStateProps,
  NoteBookDispatchProps,
  NotebookProps
} from "../types";

class NotebookList extends React.Component<NotebookProps, {}> {
  state = {
    visible: false,
    userInput: "",
    isEditMode: false,
    gistId: ""
  };
  showModal = (gist: Gist | null) => {
    const isEditMode = gist ? true : false;
    const userInput = gist ? gist.description : "";
    const gistId = gist ? gist.id : "";
    this.setState({
      visible: true,
      userInput,
      isEditMode,
      gistId
    });
  };
  handleGistCreation = () => {
    const { createGist, editGist } = this.props;
    const { userInput, isEditMode, gistId } = this.state;
    isEditMode ? editGist(gistId, userInput) : createGist(userInput);
    this.setState({
      visible: false,
      userInput: "",
      isEditMode: false
    });
  };

  handleGistCancel = () => {
    this.setState({
      visible: false,
      userInput: ""
    });
  };
  columns = [
    {
      title: "Name",
      dataIndex: "description",
      key: "description",
      render: (text: string, record: any) => (
        <a onClick={() => this.handleNameClick(record)}>{text}</a>
      )
    },
    {
      title: "Files Count",
      dataIndex: "filesCount",
      key: "filesCount",
      render: (text: string) => <p>{text}</p>
    },
    {
      title: "Status",
      dataIndex: "public",
      key: "public",
      render: (text: boolean) => {
        if (text == true) return <p>Public</p>;
        else {
          return <p>Private</p>;
        }
      }
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <span>
          <Icon type="edit" onClick={() => this.showModal(record)} />
          {/* <a onClick={() => this.showModal(record)}>Edit</a> */}
          <Divider type="vertical" />
          <Icon type="delete" onClick={() => this.handleDelete(record)} />
          {/* <a onClick={() => this.handleDelete(record)}>Delete</a> */}
          <Divider type="vertical" />
          <Icon type="share-alt" onClick={() => this.showGistUrl(record)} />
          {/* <a onClick={() => this.showGistUrl(record)}>Share</a> */}
        </span>
      )
    }
  ];

  showGistUrl = (gist: any) => {
    const { html_url } = gist;
    Modal.success({
      title: "Share this link.",
      content: html_url
    });
  };
  // replace any with gist
  handleDelete = (gist: Gist) => {
    const confirm = Modal.confirm;
    const { deleteGist } = this.props;
    confirm({
      title: `Delete gist ${gist.description}?`,
      content: "Are you sure you want to delete this gist?",
      onOk() {
        deleteGist(gist.id);
      }
    });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: userInput } = e.target;
    this.setState({
      userInput
    });
  };

  handleNameClick = (record: Gist) => {
    this.props.history.push({
      pathname: "/files",
      search: `?gistId=${record.id}`
    });
  };
  componentDidMount() {
    // update gists if store is empty
    const { updateGists, gists } = this.props;
    // // get updated gists
    if (gists.length === 0) {
      console.log("Gists are empty");
      updateGists();
    }
  }

  refresh = () => {
    const { updateGists } = this.props;
    // get updated gists
    updateGists();
  };
  public render() {
    const { gists, isLoading } = this.props;
    const { visible, userInput } = this.state;
    const {
      showModal,
      handleGistCreation,
      handleGistCancel,
      handleInputChange,
      columns
    } = this;

    return (
      <div className="voffset3">
        <Spin spinning={isLoading}>
          <div>
            <Icon type="plus-circle" onClick={() => showModal(null)} />
            <Divider type="vertical" />

            {/* <Button
              type="primary"
              onClick={() => showModal(null)}
              className="hoffset"
            >
              New
            </Button> */}
            <Icon type="sync" onClick={this.refresh} />
            {/* <Button type="primary" onClick={this.refresh}>
              Refresh
            </Button> */}
            <Modal
              title="Add new gist"
              visible={visible}
              onOk={() => handleGistCreation()}
              confirmLoading={isLoading}
              onCancel={handleGistCancel}
            >
              <Input
                placeholder="Gist Name"
                id="gistName"
                onChange={handleInputChange}
                value={userInput}
              />
            </Modal>
          </div>
          <Table
            className="voffset1"
            columns={columns}
            dataSource={gists}
            rowKey="id"
          />
          ,
        </Spin>
      </div>
    );
  }
}
function mapStateToProps(
  state: ApplicationState,
  ownProps: any
): NoteBookStateProps {
  const { gists, isLoading } = state;
  return {
    gists,
    history: ownProps.history,
    isLoading
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): NoteBookDispatchProps {
  return {
    updateGists: async () => {
      await dispatch(updateGists());
    },
    deleteGist: async (id: string) => {
      await dispatch(deleteGist(id));
    },
    createGist: async (name: string) => {
      await dispatch(createGist(name));
    },

    editGist: async (id: string, description: string) => {
      await dispatch(editGist(id, description));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotebookList);
