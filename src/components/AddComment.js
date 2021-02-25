import React from 'react'
import EmojiIcon from '../resources/icons/emoji_icon.png'
import { EmojiButton } from '@joeattardi/emoji-button';

const AddComment = (props) => {
    const picker = new EmojiButton()
    let emoji
    let textBox

    picker.on('emoji', selection => {
        emoji = selection.emoji

        textBox.innerText += emoji
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
        const username = "piccolo"
        const comment = e.target.previousElementSibling.innerText
        const newComment = {username: username, comment: comment}
        const commentsCopy = [...props.comments]
        commentsCopy.push(newComment)

        return commentsCopy
    }

    const clearCommentText = (e) => {
        e.target.previousElementSibling.innerText = ""
    }

    const handlePostClick = (e) => {
        // e.preventDefault(e)

        const updatedComments = updateComments(e)

        props.submitComment(updatedComments)
        clearCommentText(e)
        e.target.classList.add("disabled")
    }

    const handleTextInput = (e) => {
        const text = e.target.innerText
        const siblingPostButton = e.target.nextElementSibling

        if(text !== ""){
            siblingPostButton.classList.remove("disabled")
        } else if(text === ""){
            siblingPostButton.classList.add("disabled")
        }
    }

    return (
        <div className="add-comment-area">
            <form className="add-comment-form">
                <input id="emoji-trigger" type="image" className="emoji-icon" src={EmojiIcon} alt="add-emoji" onClick={e => handleEmojiClick(e)}></input>

                <div className="add-comment-text-area wrap" placeholder="Add a comment..." onInput={(e) => handleTextInput(e)} contentEditable></div>

                <input type="submit" className="submit-comment disabled" value="Post" onClick={e => handlePostClick(e)}></input>
            </form>
        </div>
    )
}

export default AddComment