import React, {useState} from 'react'
import firebase from 'firebase'
import profile_icon from '../resources/icons/profile_icon.png'

const WelcomeModal = (props) => {
    const [src,setSrc] = useState(profile_icon)
    const [errorText,setErrorText] = useState("")
    const usersRef = firebase.database().ref('users')

    async function checkForValidImage(){
        const url = document.getElementById("profile-image-url").value
        const submitBtn = document.querySelector(".btn-submit-profile-photo")

        console.log(url)

        await fetch(props.corsProxy + url, { method: 'HEAD' })
        .then(response => {
            if(url === "") {
                setSrc(profile_icon)
                setErrorText("")
            } else if (response.ok) {
                console.log('Image exists.')
                setSrc(url)
                setErrorText("")
            } else {
                console.log('Image does not exist.')
                setSrc(profile_icon)
                setErrorText("Enter a valid image URL")
            }
        }).catch(err => console.log('Error:', err))
    }

    const handleURLInput = (e) => {
        checkForValidImage()
    }

    const submitUserProfilePhoto = () => {
        props.returnFirebaseUsers()
        .then(result => props.returnUserFirebaseID(result,props.auth0ID))
        .then(result => {
            usersRef.child(result).update({'profilePhotoURL' : src})
        }).catch(error => console.log(error))
    }

    const handleStartClick = () => {
        if(src !== profile_icon){
            submitUserProfilePhoto()
        }
        window.location.reload()
    }

    return (
        <div className="welcome-modal">
            <h1>Welcome, {props.username}!</h1>
            
            <p>Express your personality with a profile photo</p>
            <div className="break"></div>

            <img className="profile-image-preview" src={src} alt="preview" />
            <div className="break"></div>

            <input className="submit-new-post-input wrap" type="url" id="profile-image-url" required onInput={(e) => handleURLInput(e)} placeholder="Image URL"/>
            <div id="url-error">{errorText}</div>
            <div className="break"></div>

            <button className="btn-submit-profile-photo" onClick={handleStartClick}>Add photo and start exploring</button>
            <div className="break"></div>
            <button className="btn-skip" onClick={handleStartClick}>Continue without profile photo</button>
        </div>
    )
}

export default WelcomeModal