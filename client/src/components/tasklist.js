import React, { Component } from 'react';
import ItemRow from './itemRow';
import ItemField from './itemField';
import axios from 'axios';

export default class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {  refreshlist: '',
                        lists: []
                    };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/lists/')
            .then(response => {
                this.setState({ lists: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidUpdate(){
        //  if(prevProps.newItem !== this.props.newItem){
         if(true) {
            axios.get('http://localhost:4000/lists/')
                .then(response => {
                     this.setState({ lists: response.data });
                })
                .catch(function (error){
                     console.log(error);
                })
         }
    }

    listoftask() {
        return this.state.lists.map(function(currentItem, i){
            return <ItemRow list={currentItem} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <ItemField />
                    </thead>
                    <tbody>
                        { this.listoftask() }
                    </tbody>
                </table>
            </div>
        )
    }
}