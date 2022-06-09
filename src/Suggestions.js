import React from 'react';
import {getHeaders} from './utils';
import Suggestion from './Suggestion';

class Suggestions extends React.Component {  
    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            suggestions: []
        };
        this.getSuggestions();
        console.log('Suggestions component created');
    }

    getSuggestions() {
        fetch('/api/suggestions', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                suggestions: data
            });
        });
    }

    render () {
        return (
            <div className="suggestions">
                <p className="suggestion-text">Suggestions for you</p>
                {
                    this.state.suggestions.map(suggestion => {
                        return <Suggestion suggestion={suggestion} key = {'suggestion-' + suggestion.id} />
                    })
                }
            </div>
        )     
    }
}

export default Suggestions;