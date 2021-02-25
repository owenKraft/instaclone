import React from 'react'
import GokuFrieza from '../resources/testing/goku_frieza_post.jpg'

const PostImage = (props) => {
    // const image = GokuFrieza
    const image = props.postImage

    return (
        <img className="post-image" src={image} alt="post" />
    )
}

export default PostImage