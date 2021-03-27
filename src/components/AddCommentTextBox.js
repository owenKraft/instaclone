import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


const AddCommentTextBox = (props) => {
    const {isAuthenticated} = useAuth0();

    if(isAuthenticated){
        return (
            <div className="add-comment-text-area wrap" placeholder="Add a comment..." onInput={(e) => props.handleTextInput(e)} contentEditable></div>
        )
    } else {
        return (
            <div className="add-comment-text-area wrap" placeholder="Add a comment..."><span style={{"color": "#8E8E8E"}}>Log in or sign up to comment</span></div>
        )
    }
}

export default AddCommentTextBox