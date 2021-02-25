import React from 'react'
import Goku from '../resources/testing/goku_profile.jpg'

const PostHeader = (props) => {
    // const username = "goku"
    // const profilePhoto = Goku
    const username = props.username
    const profilePhoto = props.profilePhoto

    return (
        <div className="post-header">
            <img className="profile-photo" src={profilePhoto} alt="profile"></img>
            <div className="username">
                {username}
            </div>
        </div>
    )
}

export default PostHeader