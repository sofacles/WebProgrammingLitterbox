import React, { Component } from 'react';
import ProjectItem from './ProjectItem';

class Projects extends Component {
    deleteProject(id) {
        this.props.onDelete(id);
    }
  render() {
    let projectItems;
    if(this.props){
        projectItems = this.props.projects.map(project => {
            //console.log(project);
            return (
                <ProjectItem key={project.title} project={project} onDelete={this.deleteProject.bind(this)} />
            );
        });
    }
    return (
      <div className="Projects">
         <ul>
             {projectItems}
        </ul>
         
      </div>
    );
  }
}

export default Projects;
