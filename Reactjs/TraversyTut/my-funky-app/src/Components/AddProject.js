import React, { Component } from 'react';
import uuid from 'uuid';


class AddProject extends Component {
    static defaultProps = {
        categories: ["home maintenance", "data structures and algorithms", "porfessional development"]
    };

    constructor() {
        super();
        this.state = {
            newProject: {}
        };
    }

    handleSubmit(e) {
        if (this.refs.title.value === '') {
            alert("project needs a title");
        } else {
            this.setState({
                newProject: {
                    id: uuid.v4(),
                    title: this.refs.title.value,
                    category: this.refs.category.value
                }
            }, function () {
                //console.log(this.state.newProject);
                this.props.addProject(this.state.newProject);
                });
        }
        e.preventDefault();
    }

    render() {
        let categoryOptions = this.props.categories.map(category => {
            return <option value={category} key={category}>{category}</option>
        });
        return (
            <div>
                <h3>Add Project</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>name</label><input type="text" ref="title" /><br />
                        <label>category</label><select ref="category">{categoryOptions}</select><br />
                        <a href="#">Add Project</a>
                    </div>
                    <input type="submit" value="submit" />
                 </form>
            </div>
        );
    }
}

export default AddProject;
