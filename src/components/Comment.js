import React, {useState} from 'react'
import LikeIcon from '../resources/icons/heart_icon.png'
import Utilities from './Utilities'

const Comment = (props) => {
    const utilities = Utilities()

    const username = props.username || "Lorem ipsum"
    const comment = props.comment || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    
    const [displayedComment,setDisplayedComment] = useState(utilities.truncateText(comment,expandComment))

    let displayIndex = props.displayIndex
    let index = props.index

    if(props.length < 1){
        displayIndex = 0
    }

    function expandComment(){
        setDisplayedComment(comment)
    }

    if(!(displayIndex <= index) ){
        return (<div display-index={displayIndex} index={index}></div>)
    }


    return (
        <div className="comment" key={props.id} display-index={displayIndex} index={index}>
            <div className="comment-text-area">
                <span className="username">
                    {username}
                </span>
                <span className="comment-text">
                    {displayedComment}
                </span>
            </div>
            {/* <img className="comment-like-icon" src={LikeIcon} alt="like icon"></img> */}
        </div>
    )
}

export default Comment