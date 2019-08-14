import React, { Component } from "react";
import PropTypes from "prop-types";
import Context from "../context";
import Config from "../config";
import "./EditFolder.css";
import { withRouter } from "react-router-dom";

class EditFolder extends Component {
  static contextType = Context;

  state = {
    folder_name: ""
  };

  componentDidMount() {
    const { folderId } = this.props.match.params;
    fetch(`${Config.API_ENDPOINT}/api/folders/${folderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Config.API_KEY}`,
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          folder_name: resData.folder_name
        });
      })
      .catch(e => {
        console.error(e);
        this.setState({ e });
      });
  }

  handleTitleChange = e => {
    this.setState({ folder_name: e.target.value });
  };

  resetFields = newFields => {
    this.setState({
      folder_name: newFields.folder_name
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { folderId } = this.props.match.params;
    const { folder_name } = this.state;
    const newFolder = { id: parseInt(folderId), folder_name };
    fetch(Config.API_ENDPOINT + `/api/folders/${folderId}`, {
      method: "PATCH",
      body: JSON.stringify(newFolder),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
      })
      .then(() => {
        this.resetFields(newFolder);
        this.context.updateFolder(newFolder);
        this.props.history.goBack();
      });
  };

  render() {
    const { folder_name } = this.state;
    return (
      <section className="EditFolder">
        {" "}
        <h2 className="EditFolder_header">Edit Folder</h2>
        <form className="EditFolder_form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="EditFolder_input"
            id="folder_name"
            name="folder_name"
            title={folder_name}
            onChange={this.handleTitleChange}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={this.props.history.goBack}>
            Go Back
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(EditFolder);
