import React, { Component } from 'react';


class ProjectItem extends Component {
  render() {
    return (
      <li className="ProjectItem">
         {this.props.project.title} - {this.props.project.category}
      </li>
    );
  }
}

export default ProjectItem;
