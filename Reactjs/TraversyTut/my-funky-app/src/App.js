import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import uuid from 'uuid'
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {projects: []};
    }

    componentWillMount() {
        this.setState({
            projects: [
                {
                    id: uuid.v4(),
                    title: "balance a tree",
                    category: "data structures and algorithms"
                },
                {
                    id: uuid.v4(),
                    title: "mount sash rod",
                    category: "home maintenance"
                },
                {
                    id: uuid.v4(),
                    title: "write a sorting algorithm",
                    category: "data structures and algorithms"
                },
                {
                    id: uuid.v4(),
                    title: "learn ES6",
                    category: "porfessional development"
                }
            ]})
    }

    handleAddProject(project) {
        console.log(project);
        let projects = this.state.projects;
        projects.push(project);
        this.setState(project);
    }

    handleDeleteProject(id) {
        let projects = this.state.projects;
        let index = projects.findIndex(p => { p.id === id });
        projects.splice(index, 1);
        this.setState({ projects: projects });
    }
    render() {
        return (
            <div className="App">
                My App
                <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
                <AddProject addProject={this.handleAddProject.bind(this)}/>
            </div>
        );
    }
}

export default App;
