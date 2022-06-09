import React from 'react';
import {getHeaders} from './utils';

class Stories extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            stories: []
        }
        this.createStories();
        console.log('Stories component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('Stories component mounted');
    }

    story2Html(story){
        return (
            <div>
                <img className="pic" src={ story.user.thumb_url }  alt={ story.user.username } />
                <p>{ story.user.username }</p>
            </div>
        );
    };
    createStories(){
        fetch('/api/stories', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                stories: data
            })
            console.log(data);
        })
    }

    render () {
        return (
            <div className = "stories">
                {this.state.stories.map(this.story2Html)}
            </div>
        );
    }
}

export default Stories;