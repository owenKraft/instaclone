import React from 'react'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostEngagement from './PostEngagement'
import Goku from '../resources/testing/goku_profile.jpg'
import GokuFrieza from '../resources/testing/goku_frieza_post.jpg'

const Post = (props) => {
    const id = props.id
    const username = props.username || "goku"
    const profilePhoto = props.profilePhoto || Goku
    const postImage = props.postImage || GokuFrieza
    const caption = props.caption || "this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar"
    const comments = props.comments || []
    const numOfLikes = props.numOfLikes || 0
    const likes = props.likes || []
    const saves = props.saves || []

    return (
        <div id={props.id} className="post">
            <PostHeader 
                username = {username}
                profilePhoto = {profilePhoto}
            />
            <PostImage 
                postImage = {postImage}
            />
            <PostEngagement
                id = {id} 
                username = {username}
                caption = {caption}
                comments = {comments}
                numOfLikes = {numOfLikes}
                likes = {likes}
                saves = {saves}
                userMetadata = {props.userMetadata}
            />
        </div>
    )
}

export default Post