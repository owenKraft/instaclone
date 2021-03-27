import React from 'react'
import firebase from 'firebase'
import EmojiIcon from '../resources/icons/emoji_icon.png'
import AddCommentTextBox from './AddCommentTextBox'
import { EmojiButton } from '@joeattardi/emoji-button';

const AddComment = (props) => {
    const postsRef = firebase.database().ref('posts')
    const id = props.id
    const picker = new EmojiButton()
    let emoji
    let textBox

    picker.on('emoji', selection => {
        emoji = selection.emoji

        textBox.innerText += emoji

        const emojiCheck = /\p{Emoji}/u.test(textBox.innerText)
        const siblingPostButton = textBox.nextElementSibling
        if(emojiCheck){
            siblingPostButton.classList.remove("disabled")
        }
    });

    const selectTextArea = (e) => {
        textBox = e.target.nextElementSibling
    }

    const handleEmojiClick = (e) => {
        e.preventDefault()
        selectTextArea(e)
        picker.togglePicker(e.target)
    }

    const updateComments = (e) => {
        const username = props.userMetadata.user_metadata.username
        const comment = e.target.previousElementSibling.innerText
        const newComment = {username: username, comment: comment}
        const commentsCopy = [...props.getComments()]
        commentsCopy.push(newComment)

        return commentsCopy
    }

    const clearCommentText = (e) => {
        e.target.previousElementSibling.innerText = ""
    }

    const handlePostClick = (e) => {
        e.preventDefault()
        const updatedComments = updateComments(e)
        
        clearCommentText(e)
        e.target.classList.add("disabled")
        
        postsRef.child(id).update({'comments' : updatedComments})
        .then(props.setComments(props.getComments()))
    }

    const handleTextInput = (e) => {
        const text = e.target.innerText
        const emojiCheck = /\p{Emoji}/u.test(e.target.innerText)
        const siblingPostButton = e.target.nextElementSibling
        console.log(emojiCheck)

        if(text !== "" || emojiCheck){
            siblingPostButton.classList.remove("disabled")
        } else if(text === "" && !emojiCheck){
            siblingPostButton.classList.add("disabled")
        }
    }

    return (
        <div className="add-comment-area">
            <form className="add-comment-form">
                <input type="image" className="emoji-icon" src={EmojiIcon} alt="add-emoji" onClick={e => handleEmojiClick(e)}></input>
                
                <AddCommentTextBox 
                    handleTextInput = {handleTextInput}
                />

                <input type="submit" className="submit-comment disabled" value="Post" onClick={e => handlePostClick(e)}></input>
            </form>
        </div>
    )
}

export default AddComment