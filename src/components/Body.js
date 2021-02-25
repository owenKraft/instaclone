import React from 'react'
import Post from './Post'
import Goku from '../resources/testing/goku_profile.jpg'
import ManOnMoon from '../resources/testing/apollo_11.jpg'

const Body = (props) => {
    const username = "goku"
    const profilePhoto = Goku
    const postImage = ManOnMoon
    const caption = "this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar this is a caption hear me roar"
    const comments = [
        {username: "vegeta"},
        {username: "trunks", comment: "woah dude"},
        {username: "gohan", comment: "kowabunga"},
        {username: "tien", comment: "hey guys"},
        {username: "bulma", comment: "hola senor"}
    ]
    const numOfLikes = 0

    return (
        <div className="body">
            <Post 
                username = {username}
                profilePhoto = {profilePhoto}
                postImage = {postImage}
                caption = {caption}
                comments = {comments}
                numOfLikes = {numOfLikes}
            />
            <Post />
            <div id="bottom-spacer" style={{minHeight: "60px", width: "100%"}}></div>
        </div>
    )
}

export default Body