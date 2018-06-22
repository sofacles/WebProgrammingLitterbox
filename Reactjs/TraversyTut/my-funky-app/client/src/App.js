import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import uuid from 'uuid'
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {
            projects: [],
            response: ''
        };
    }

    componentWillMount() {
        console.log("inside component will Mount");
        this.callApi()
            .then(res => this.setState({ projects: res.projects }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };


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
