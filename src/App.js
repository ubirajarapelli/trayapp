import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

const API = 'http://demo8346836.mockable.io/trayapp';

class App extends Component {
    constructor(props) {
        super(props);

        this.setTrayValue = this.setTrayValue.bind(this);

        this.state = {
            payload: {},
            isLoading: false,
            error: null,
        }
    }

    componentDidCatch() {
        console.log('componentDidCatch');
    }

    componentDidMount() {
        window.addEventListener('setTrayValue', this.setTrayValue);
    }

    componentWillMount() {
        window.removeEventListener('setTrayValue', this.setTrayValue);
    }

    setTrayValue() {
        this.setState({isLoading: true});

        axios.get(API)
        .then(response => this.setState({
            payload: response.data[0],
            isLoading: false
        }))
        .catch(error => this.setState({
            error,
            isLoading: false
        }))
    }

    render(){
        const { payload, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div className="tray-full">
                <p>{payload.guid}</p>
                <p>{payload.id}</p>
            </div>
        );
    }
}


export default App;