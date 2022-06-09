import React from 'react';
import {getHeaders} from './utils';
class AddCommentButton extends React.Component {  

    constructor(props){
        super(props);
        this.addComments = this.addComments.bind(this);
        this.textInput = React.createRef();
        this.empty = this.empty.bind(this);
    }
    
    addComments(){
        let text = document.getElementById(`textBox${this.props.postId}`).value;
        if(text){
            console.log(text)
            const postId = this.props.postId;
            const postData = {
                "post_id": postId,
                "text": text
            };
            
            fetch("/api/comments", {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.textInput.current.focus();
                document.getElementById(`textBox${this.props.postId}`).value='';
                this.props.requeryPost();
            });
        }
    }
    
    empty(event){
        if (event.key === 'Enter') {
            this.addComments()
           } 
    
    }
    render(){
        return (
            <div className="add-comment">
            <div className="input-holder">
                 
                <input id = {'textBox' + this.props.postId}
                 type="text"  onKeyDown={this.empty} ref={this.textInput} aria-label="Add comments" placeholder="Add comments..."/>
            </div>
            <button className="link" onClick = {this.addComments}>Post</button>
           
        </div>
           
        );     
    }
}

export default AddCommentButton;