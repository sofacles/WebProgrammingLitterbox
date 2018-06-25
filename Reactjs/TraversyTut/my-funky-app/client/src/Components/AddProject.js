import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

var propTypes = PropTypes;


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
            var h = this.callApi({
                title: this.refs.title.value,
                category: this.refs.category.value
            }).then(res => {
                    console.log(res);
                    //this.setState({
                    //    newProject: {
                    //        id: uuid.v4(),
                    //        title: this.refs.title.value,
                    //        category: this.refs.category.value
                    //    }
                    //}, function () {
                    //    //console.log(this.state.newProject);
                    //    this.props.addProject(this.state.newProject);
                    //});
                })
                .catch(err => console.log(err));
        }
        e.preventDefault();
    }

    callApi = async (proj) => {
        const rawResponse = await fetch('/api/addproject', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: proj.title, category: proj.category })
        });
        const content = await rawResponse.json();
        return content;
    };

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

AddProject.propTypes = {
    addProject: propTypes.func,
    categories: propTypes.array
};

export default AddProject;
