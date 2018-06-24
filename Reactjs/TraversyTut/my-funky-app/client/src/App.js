import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {
            projects: []
        };
    }

    componentWillMount() {
        this.callApi()
            .then(res => {
                var theProjects = [];
                for (var i = 0; i < res.length; i++) {
                    theProjects.push({
                        id: res[i].id,
                        title: res[i].data.title,
                        category: res[i].data.category
                    });
                }
                this.setState({ projects: theProjects })
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/projects');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body.data;
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
                <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
                <AddProject addProject={this.handleAddProject.bind(this)}/>
            </div>
        );
    }
}

export default App;
