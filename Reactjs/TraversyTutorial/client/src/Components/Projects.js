import React, { Component } from 'react';
import ProjectItem from './ProjectItem';
import PropTypes from 'prop-types';

//OK, I guess this is a webpack thing.  If I try to do something like PropTypes.checkPropType or even React.createElement
//it doesn't work.  But if you assign it to a variable, then you can access that 
var propTypes = PropTypes;

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


Projects.propTypes = {
    projects: propTypes.array,
    onDelete: propTypes.func
};
export default Projects;
