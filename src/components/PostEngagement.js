import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import AddComment from './AddComment'
import Utilities from './Utilities'
import Likes from './Likes'
import EngagementIcon from './EngagementIcon'
import AllComments from './AllComments'
import ViewAllComments from './ViewAllComments'
import { useAuth0 } from "@auth0/auth0-react"

const PostEngagement = (props) => {
    const {user,isAuthenticated} = useAuth0();
    const utilities = Utilities()

    const id = props.id
    const username = props.username
    const caption = props.caption

    const postsRef = firebase.database().ref('posts')
    const commentsRef = firebase.database().ref('posts').child(id).child('comments')

    const [comments,setComments] = useState(props.comments)
    const [liked,setLiked] = useState(false)
    const [displayIndex,setDisplayIndex] = useState(0)
    const [displayedCaption,setDisplayedCaption] = useState(utilities.truncateText(caption,expandCaption))

    useEffect(() => {
        setComments(getComments())
        if (comments.length > 2) {
            setDisplayIndex(comments.length-2)
        } else {
            setDisplayIndex(0)
        }
    },[])

    useEffect(() => {
        setLiked(getLikes())
    },[props.userMetadata])

    function expandCaption(){
        setDisplayedCaption(caption)
    }

    const getNumOfLikes = () => {
        if(props.likes && props.likes.length > 0){
            return props.likes.length
        } else {
            return 0
        }
    }

    const [numOfLikes,setNumOfLikes] = useState(getNumOfLikes())
    
    const getLikes = () => {
        if(isAuthenticated && props.userMetadata && props.likes.length > 0){
            if(props.likes.find(userID => userID === props.userMetadata.user_id) !== undefined){
                return true
            } else {return false}
        } else {return false}   
    }

    const likePost = () => {
        setLiked(!liked)
        if(!liked) {
            setNumOfLikes(numOfLikes + 1)

            let likes = props.likes
            likes.push(props.userMetadata.user_id)
    
            postsRef.child(id).update({'likes' : likes})
        } else if(liked && numOfLikes >= 1){
            setNumOfLikes(numOfLikes - 1)

            let likes = props.likes
            const index = likes.findIndex(userID => userID === props.userMetadata.user_id)
            likes.splice(index,1)
            console.log(likes)
    
            postsRef.child(id).update({'likes' : likes})
        }
    }

    const [collapseFullComments,setCollapseFullComments] = useState(() => {
        const comments = getComments()
        return comments.length > 2
    })

    const displayAllComments = () => {
        setCollapseFullComments(false)
        setDisplayIndex(0)
    }

    useEffect(() => {
        if(collapseFullComments === false){
            setComments([],setComments([...getComments()]))
        }
    },[collapseFullComments])

    function getComments(){
        let allComments = []
        commentsRef.on('value', (snapshot) => {
            let comments = snapshot.val()
            for(let comment in comments){
                allComments.push({
                    id: comment,
                    username: comments[comment].username,
                    comment: comments[comment].comment
                })
            }
        })
        return allComments
    }

    return (
        <div className="post-engagement">
            
            <div className="button-bar">
                <div className="left-buttons">
                    {isAuthenticated
                    ?   <EngagementIcon 
                            icon = "like"
                            selected = {liked}
                            clickFunction = {likePost}
                        />
                    :   <EngagementIcon 
                            icon = "like"
                            selected = {liked}
                        />
                    }
                </div>
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
                display = {collapseFullComments}
                comments = {comments}
                length = {comments.length}
                displayAllComments = {displayAllComments}
                getComments = {getComments}
            />

            <AllComments
                id = {props.id}
                collapseFullComments = {collapseFullComments}
                comments = {comments}
                displayIndex = {displayIndex}
            />

            <AddComment
                id = {id}
                comments = {comments}
                getComments = {getComments}
                setComments = {setComments}
                userMetadata = {props.userMetadata}
            />
        </div>
    )
}

export default PostEngagement