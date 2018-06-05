import React, { Component } from 'react';
import ProjectItem from './ProjectItem';

class Projects extends Component {
  render() {
    let projectItems;
    if(this.props){
        projectItems = this.props.projects.map(project => {
            //console.log(project);
            return (
                <ProjectItem key={project.title} project={project} />
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
