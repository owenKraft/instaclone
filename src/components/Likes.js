import React from 'react'

const Likes = (props) => {
    // let totalLikes = props.totalLikes || false
    let totalLikes
    if(props.totalLikes && props.totalLikes > 0){
        totalLikes = props.totalLikes
    } else {
        totalLikes = false
    }

    let likesText
    if(totalLikes > 1){
        likesText = "likes"
    } else {
        likesText = "like"
    }

    return (
        totalLikes && (
        <div className="likes">
            {totalLikes} {likesText}
        </div>
        )
    )
}

export default Likes