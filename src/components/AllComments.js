import React,{useState,useEffect} from 'react'
import Comment from './Comment'
import firebase from 'firebase'

const AllComments = (props) => {
    const id = props.id
    const commentsRef = firebase.database().ref('posts').child(id).child('comments')
    const [comments,setComments] = useState(props.comments)

    useEffect(() => {
        commentsRef.on('value', (snapshot) => {
            let comments = snapshot.val()
            let allComments = []
            for(let comment in comments){
                allComments.push({
                    id: comment,
                    username: comments[comment].username,
                    comment: comments[comment].comment
                })
            }
            setComments(allComments)
        })      
    },[props.comments])

    return (
        <div>
            {comments.map((comment,index) => {
                return (
                    <Comment
                        key = {index}
                        id = {comment.id}
                        username = {comment.username}
                        comment = {comment.comment}
                        index = {index}
                        displayIndex = {props.displayIndex}
                        length = {props.length}
                    />
                )
            })}
        </div>
    )
}

export default AllComments