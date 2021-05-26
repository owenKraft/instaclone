import React from 'react'

const PostImage = (props) => {
    const image = props.postImage

    return (
        <img className="post-image" src={image} alt="post" />
    )
}

export default PostImage