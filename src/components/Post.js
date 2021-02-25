import React from 'react'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostEngagement from './PostEngagement'
import Goku from '../resources/testing/goku_profile.jpg'
import GokuFrieza from '../resources/testing/goku_frieza_post.jpg'

const Post = (props) => {
    const username = props.username || "goku"
    const profilePhoto = props.profilePhoto || Goku
    const postImage = props.postImage || GokuFrieza
    const caption = props.caption || "this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar"
    const comments = props.comments || [
        {username: "vegeta"},
        {username: "trunks", comment: "woah dude"},
        {username: "gohan", comment: "kowabunga"},
        {username: "tien", comment: "hey guys"},
        {username: "bulma", comment: "hola senor"}
    ]
    const numOfLikes = props.numOfLikes || 0

    return (
        <div className="post">
            <PostHeader 
                username = {username}
                profilePhoto = {profilePhoto}
            />
            <PostImage 
                postImage = {postImage}
            />
            <PostEngagement 
                username = {username}
                caption = {caption}
                comments = {comments}
                numOfLikes = {numOfLikes}
            />
        </div>
    )
}

export default Post