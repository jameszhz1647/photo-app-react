import React from 'react';
import {getHeaders} from './utils';

class NavBar extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            nav: []
        }
        this.createNav();
        console.log('NavBar component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('NavBar component mounted');
    }

    createNav(){
        fetch('/api/profile', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                nav: data
            })
            console.log(data);
        })
    }

    render () {
        return (
            <nav className="main-nav">
                <h1>{this.props.title}</h1>
                <ul>   
                    <li><a href="/api">API Docs</a></li>
                    <li><span>{this.state.nav.username}</span></li>
                    <li><a href="/logout">Sign out</a></li>
                </ul> 
            </nav>       
        );
    }
}

export default NavBar;