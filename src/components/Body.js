import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import Post from './Post'
import Modal from './Modal'
import Register from './Register'
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Loading'

const Body = (props) => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [registerModal,setRegisterModal] = useState(false)
    const [posts,setPosts] = useState([])
    const postsRef = firebase.database().ref('posts')

    useEffect(() => {
        postsRef.on('value', (snapshot) => {
            let posts = snapshot.val()
            let allPosts = []
            for(let post in posts){
                allPosts.push({
                    id: post,
                    user_id: posts[post].user_id,
                    username: posts[post].username,
                    profilePhoto: posts[post].profilePhoto,
                    postImage: posts[post].postImage,
                    caption: posts[post].caption,
                    comments: posts[post].comments,
                    numOfLikes: posts[post].numOfLikes,
                    likes: posts[post].likes,
                    saves: posts[post].saves
                })
            }
            allPosts.reverse()
            setPosts(allPosts)
        })
    },[])

    useEffect(() => {
        if(props.userMetadata !== null){
            displayRegisterModal(props.userMetadata)
        }
    },[props.userMetadata])

    const displayRegisterModal = (userMetadata) => {
        if(userMetadata && !(userMetadata.hasOwnProperty("user_metadata") && userMetadata.user_metadata.hasOwnProperty("username"))){
            setRegisterModal(true)
        }
    }

    if (isLoading) {
        return <Loading />;
    } else {
        // console.log(props.userMetadata)
    }

    return (
        <div className="body">
            
            {(isAuthenticated && registerModal) &&  
                <Modal
                    id={"modal-set-username"}
                    allowClose = {false}
                    isAuthenticated = {isAuthenticated}
                    displayOnLoad = {true}
                    content = {
                        <Register
                            accessToken = {props.accessToken}
                            corsProxy = {props.corsProxy}
                        />
                    }
                />
            }

            {posts.map((post) => {
                return (
                    <Post 
                        key = {post.id}
                        id={post.id}
                        username = {post.username}
                        profilePhoto = {post.profilePhoto}
                        postImage = {post.postImage}
                        caption = {post.caption}
                        comments = {post.comments}
                        numOfLikes = {post.numOfLikes}
                        likes = {post.likes}
                        saves = {post.saves}
                        userMetadata = {props.userMetadata}
                    />
                )
            })}
            <div id="bottom-spacer" style={{minHeight: "60px", width: "100%"}}></div>
        </div>
    )
}

export default Body