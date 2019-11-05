import React, { Component } from 'react';
import TaskList from './tasklist';
import axios from 'axios';

export default class CreateList extends Component {

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

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Item Status: ${this.state.list_status}`);
        console.log(`Item: ${this.state.list_item}`);
        console.log(`Item Due: ${this.state.list_due}`);

        const newItem = {
            list_status: this.state.list_status,
            list_item: this.state.list_item,
            list_due: this.state.list_due,
        };

        axios.post('http://localhost:4000/lists/add', newItem)
             .then(res => {
                 this.setState({
                     list_status: '',
                     list_item: '',
                     list_due: '',
                     new_item: newItem
                 })
             });
    }

    render() {
        return (
            <div>
            <div style={{marginTop: 10}}>
                <h3>Create New Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>New Item: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.list_item}
                                onChange={this.onChangeListItem}
                                />
                    </div>
                    <div className="form-group">
                        <label>Due Date: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.list_due}
                                onChange={this.onChangeListDue}
                                />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.list_status}
                                onChange={this.onChangeListStatus}
                                />
                    </div>        
                    <div className="form-group">
                        <input type="submit" value="Create Item" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            <TaskList newItem={this.state.new_item}/>
            </div>
        )
    }
}