import React from 'react';
import {getHeaders} from './utils';


class Suggestion extends React.Component {  
    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            suggestion: this.props.suggestion
        };
        this.toggleFollow = this.toggleFollow.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        console.log('Suggestion component created');
    }

    toggleFollow(ev) {
        const elem = ev.currentTarget;
        if (elem.getAttribute('aria-checked') === 'true') {
            console.log('unfollowing');
            this.unfollow(elem.dataset.followingId, elem);
        } else {
            console.log('following');
            this.follow(elem.dataset.userId, elem);
        }
    }

    follow(userId, elem) {
        const data = {
            "user_id": userId
        };
        fetch('/api/following/', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
            elem.innerHTML = 'unfollow';
            elem.setAttribute('aria-checked', true);
            elem.classList.remove('follow');
            elem.classList.add('unfollow');
            elem.setAttribute('data-following-id', data.id);
        });
    }

    unfollow(followingId, elem) {
        fetch(`/api/following/${followingId}`, {
            method: 'DELETE',
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            elem.innerHTML = 'follow';
            elem.setAttribute('aria-checked', false);
            elem.classList.remove('unfollow');
            elem.classList.add('follow');
            elem.removeAttribute('data-following-id');
        });
    }

    render () {
        const suggestion = this.state.suggestion;

        return (
            <section>
                <img className="pic" src={suggestion.thumb_url} alt="img" />
                <div>
                    <p className="username">{suggestion.username}</p>
                    <p className="text">suggested for you</p>
                </div>
                <div>
                    <button
                        className="link following"
                        role="switch"
                        aria-label="Follow"
                        aria-checked="false"
                        data-user-id={suggestion.id}
                        onClick={this.toggleFollow}>follow</button>
                </div>
            </section>
        )     
    }
}

export default Suggestion;