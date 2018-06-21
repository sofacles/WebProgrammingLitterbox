import React, { Component } from 'react';
import PropTypes from 'prop-types';

var propTypes = PropTypes;


class ProjectItem extends Component {
    deleteProject(id) {
        console.log("deleting");
        this.props.onDelete(id)
    }
  render() {
    return (
      <li className="ProjectItem">
        <strong>{this.props.project.title}</strong> - {this.props.project.category} <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>X</a> 
      </li>
    );
  }
}

ProjectItem.propTypes = {
    project: propTypes.PropTypes.object,
    onDelete: propTypes.PropTypes.func
};

export default ProjectItem;
