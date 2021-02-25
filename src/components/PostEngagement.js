import React, {useState} from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import Utilities from './Utilities'
import Likes from './Likes'
import EngagementIcon from './EngagementIcon'
import ViewAllComments from './ViewAllComments'

const PostEngagement = (props) => {
    const utilities = Utilities()

    // const username = "goku"
    // const caption = "this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar"
    const username = props.username
    const caption = props.caption
    // const [comments,setComments] = useState([
    //     {username: "vegeta"},
    //     {username: "trunks", comment: "woah dude"},
    //     {username: "gohan", comment: "kowabunga"},
    //     {username: "tien", comment: "hey guys"},
    //     {username: "bulma", comment: "hola senor"}
    // ])
    const [comments,setComments] = useState(props.comments)

    const [displayedCaption,setDisplayedCaption] = useState(utilities.truncateText(caption,expandCaption))

    function expandCaption(){
        setDisplayedCaption(caption)
    }

    const submitComment = (newComment) => {
        setComments(newComment)
    }

    const [numOfLikes,setNumOfLikes] = useState(props.numOfLikes)
    const [liked,setLiked] = useState(false)
    const likePost = () => {
        setLiked(!numOfLikes)
        if(!numOfLikes) {
            setNumOfLikes(numOfLikes + 1)
        } else if(numOfLikes && numOfLikes >= 1){
            setNumOfLikes(numOfLikes - 1)
        }
        
    }

    const [saved,setSaved] = useState(false)
    const savePost = () => {
        setSaved(!saved)
    }

    const [displayViewAllComments,setDisplayViewAllComments] = useState(comments.length > 2)
    const [displayedCommentsNum,setDisplayedCommentsNum] = useState(2)
    const displayAllComments = () => {
        setDisplayedCommentsNum(comments.length)
        setDisplayViewAllComments(false)
    }

    return (
        <div className="post-engagement">
            
            <div className="button-bar">
                <div className="left-buttons">
                    <EngagementIcon 
                        icon = "like"
                        selected = {liked}
                        clickFunction = {likePost}
                    />
                    <EngagementIcon 
                        icon = "comment"
                    />
                    <EngagementIcon 
                        icon = "share"
                    />
                </div>
                <EngagementIcon 
                    icon = "save"
                    className = "post-save"
                    selected = {saved}
                    clickFunction = {savePost}
                />
            </div>

            <Likes 
                totalLikes = {numOfLikes}
            />

            <div className="caption-area">
                <span className="username">
                    {username}
                </span>
                <span className="caption">
                    {displayedCaption}
                </span>
            </div>

            <ViewAllComments
                display = {displayViewAllComments}
                length = {comments.length}
                displayAllComments = {displayAllComments}
            />

            {comments.slice(0,displayedCommentsNum).map((comment) => {
                return (
                    <Comment 
                        username = {comment.username}
                        comment = {comment.comment}
                    />
                )
            })}

            <AddComment
                comments = {comments}
                submitComment = {submitComment}
            />
        </div>
    )
}

export default PostEngagement