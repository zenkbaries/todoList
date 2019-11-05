import React, { Component } from 'react';
import axios from 'axios';

export default class EditTask extends Component {

    constructor(props) {
        super(props);

        this.onChangeListStatus = this.onChangeListStatus.bind(this);
        this.onChangeListItem = this.onChangeListItem.bind(this);
        this.onChangeListDue = this.onChangeListDue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            new_item: {},
            list_status: '',
            list_item: '',
            list_due: '',
            list_created: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/lists/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    list_status: response.data.list_status,
                    list_item: response.data.list_item,
                    list_due: response.data.list_due,
                    list_created: response.data.list_created
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeListStatus(e) {
        this.setState({
            list_status: e.target.value
        });
    }

    onChangeListItem(e) {
        this.setState({
            list_item: e.target.value
        });
    }

    onChangeListDue(e) {
        this.setState({
            list_due: e.target.value
        });
    }

    onChangeTaskCompleted(e) {
        this.setState({
            list_created: !this.state.list_created
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            list_status: this.state.list_status,
            list_item: this.state.list_item,
            list_due: this.state.list_due,
            list_created: this.state.list_created
        };
        console.log(obj);
        axios.post('http://localhost:4000/lists/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data))
            .then(console.log("Now redirecting..."))
            this.props.history.push("/");
            // return (<Redirect to='/' />);
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Status: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.list_status}
                                onChange={this.onChangeListStatus}
                                />
                    </div>
                    <div className="form-group">
                        <label>Task: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.list_item}
                                onChange={this.onChangeListItem}
                                />
                    </div>
                    <div className="form-group">
                        <label>Due: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.list_due}
                                onChange={this.onChangeListDue}
                                />
                    </div>


                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}