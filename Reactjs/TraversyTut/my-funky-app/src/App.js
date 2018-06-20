import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
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
                    title: "balance a tree",
                    category: "data structures and algorithms"
                },
                {
                    title: "mount sash rod",
                    category: "home maintenance"
                },
                {
                    title: "write a sorting algorithm",
                    category: "data structures and algorithms"
                },
                {
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
    render() {
        return (
            <div className="App">
                My App
                <Projects projects={this.state.projects} />
                <AddProject addProject={this.handleAddProject.bind(this)}/>
            </div>
        );
    }
}

export default App;
