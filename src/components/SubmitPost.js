import React, {useState} from 'react'
import firebase from 'firebase'
import placeholder from '../resources/placeholder-image.png'
import EmojiIcon from '../resources/icons/emoji_icon.png'
import { EmojiButton } from '@joeattardi/emoji-button'
// import VerifyingImage from './VerifyingImage'

const SubmitPost = (props) => {
    const [src,setSrc] = useState(placeholder)
    const postsRef = firebase.database().ref('posts')
    const picker = new EmojiButton()
    let emoji

    picker.on('emoji', selection => {
        emoji = selection.emoji

        document.getElementById("caption").innerText += emoji

        const emojiCheck = /\p{Emoji}/u.test(document.getElementById("caption").innerText)
        const submitBtn = document.querySelector(".submit-new-post-btn")
        if(emojiCheck && document.getElementById("url").value !== ""){
            submitBtn.classList.remove("disabled")
        }
    });

    const submitPost = (e) => {
        const thisModal = e.target.closest(".modal")
        thisModal.style.display = "none";
        const newPost = {
            user_id: props.userMetadata.user_id,
            username: props.userMetadata.user_metadata.username,
            profilePhoto: props.profilePhoto,
            postImage: src,
            caption: document.querySelector("#caption").innerText,
            comments: [],
            numOfLikes: 0
        }
        postsRef.push(newPost)
    }

    async function checkForValidImage(){
        const url = document.getElementById("url").value
        let errorText = document.getElementById("url-error")

        // const verifyingImage = <VerifyingImage />
        // errorText.appendChild(<VerifyingImage />)

        await fetch(props.corsProxy + url, { method: 'HEAD' })
        .then(response => {
            // verifyingImage.remove()

            if(url === "") {
                setSrc(placeholder)
                errorText.innerText = ""
            } else if (response.ok) {
                console.log('Image exists.');
                setSrc(url)
                errorText.innerText = ""
            } else {
                console.log('Image does not exist.');
                errorText.innerText = "Enter a valid image URL"
            }
        }).catch(err => console.log('Error:', err));
    }

    const handleURLInput = (e) => {
        handleTextInput(e)
        checkForValidImage()
    }

    const handleTextInput = (e) => {
        const url = document.getElementById("url").value
        const caption = document.getElementById("caption").innerText
        const emojiCheck = /\p{Emoji}/u.test(caption)
        const submitBtn = document.querySelector(".submit-new-post-btn")

        if(url !== "" && (caption !== "" || emojiCheck)){
            submitBtn.classList.remove("disabled")
        } else if(url === "" || (caption === "" && !emojiCheck)){
            submitBtn.classList.add("disabled")
        }
    }

    const handleEmojiClick = (e) => {
        e.preventDefault()
        picker.togglePicker(e.target)
    }

    return (
        <div className="submit-post">
            <img className="preview-image" src={src} alt="preview" />

            <div className="add-post-info">
                <form>
                    <input className="submit-new-post-input wrap" type="url" id="url" required onInput={e => handleURLInput(e)} placeholder="Image URL"/>
                    <div id="url-error"></div>

                    <div id="caption" className="submit-new-post-input wrap" placeholder="Add a caption..." onInput={e => handleTextInput(e)} contentEditable></div>
                        
                    <div className="submit-new-post-div">
                        <input type="image" className="emoji-icon" src={EmojiIcon} alt="add-emoji" onClick={e => handleEmojiClick(e)} />
                        <input id="submit-new-post-btn" className="submit-new-post-btn disabled" type="submit" onClick={e => submitPost(e)} />
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default SubmitPost