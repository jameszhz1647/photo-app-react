import React from 'react';
import LikeButton from './LikeButton';
import {getHeaders} from './utils';
import BookmarkButton from './BookmarkButton';
import AddCommentButton from './AddCommentButton';

class Post extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.model
        }

        this.requeryPost = this.requeryPost.bind(this);
    }

    requeryPost() {
        fetch(`https://photo-app-zz-hw5.herokuapp.com/api/posts/${this.state.post.id}`, {
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    post: data
                });
            });
    }
    
    // comments2Html(comment){
    //     return (
    //         <p><strong>{comment.user.username}:</strong>{ comment.text }</p>
    //     );
    // };

    displayComments(post){
        if (post.comments.length > 1) {
            //display button
            return (
                <button className="link showModal" data-post-id={post.id}> View all {post.comments.length} comments </button>
            )
        }else {
            return ;
        }
    }
    
    showComment (post) {
        if (post.comments.length > 0) {
            return (
                <div className="caption">
                    <p><strong>{post.comments[post.comments.length - 1].user.username}</strong> {post.comments[post.comments.length - 1].text}</p>
                    <p className="timestamp">{ post.comments[post.comments.length - 1].display_time }</p>
                </div>
            )

            
        } else {
            return ''
        }
    }

    render () {
        const post = this.state.post;
        if (!post) {
            return (
                <div></div>  
            );
        }
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                
                <div className="info">
                    <div className='buttons'>
                        <div>
                            <LikeButton 
                            postId={post.id} 
                            likeId={post.current_user_like_id}
                            requeryPost={this.requeryPost} />

                            <i className="far fa-comment"></i>
                            <i className="far fa-paper-plane"></i>
                        </div>
                        <BookmarkButton
                            postId={post.id}
                            bookmarkId={post.current_user_bookmark_id}
                            requeryPost={this.requeryPost} />

                    </div>

                    <p className="likes"><strong>{ Object.keys(post.likes).length } likes</strong></p>

                    <div className="caption">
                        <p><strong>{ post.user.username }</strong> { post.caption }</p>
                        <p className="timestamp">{ post.display_time }</p>
                    </div>

                    {/* {post.comments.map(this.comments2Html)} */}
                    { this.displayComments(post) }
                    { this.showComment(post) }

                </div>
                <AddCommentButton 
                    postId = {post.id}
                    requeryPost = {this.requeryPost}>
                </AddCommentButton>                
            </section> 
        );     
    }
}

export default Post;