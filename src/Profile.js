import React from 'react';
import {getHeaders} from './utils';

class Profile extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            profile: []
        }
        this.createProfile();
        console.log('Profile component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('Profile component mounted');
    }

    createProfile(){
        fetch('https://photo-app-zz-hw5.herokuapp.com/api/profile', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                profile: data
            })
            console.log(data);
        })
    }

    render () {
        return (
            <div className = "profile">
                <img src={ this.state.profile.image_url } alt={ "profile"} ></img>
                <div className = "info">{ this.state.profile.username }</div>
            </div>
        );
    }
}

export default Profile;