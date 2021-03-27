import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Logo from '../resources/icons/logo.png'
import Home from '../resources/icons/home_filled_icon.png'
import Upload from '../resources/icons/upload_icon.png'
import ProfileDropdown from './ProfileDropdown'
import Modal from './Modal'
import SubmitPost from './SubmitPost'
import { useAuth0 } from "@auth0/auth0-react"
import profile_icon from '../resources/icons/profile_icon.png'
import Utilities from './Utilities'

const Header = (props) => {
    const {user,isLoading,isAuthenticated,loginWithRedirect} = useAuth0()
    const [profileDropdownVisible,setProfileDropdownVisible] = useState(false)
    const [profilePhoto,setProfilePhoto] = useState(profile_icon)
    const utilities = Utilities()

    const displayProfileDropdown = () => {
        setProfileDropdownVisible(!profileDropdownVisible)
    }

    const setOutsideClickListener = () => {
        document.addEventListener('mouseup', function(e) {
            const dropdown = document.querySelector(".profile-dropdown")
            if(dropdown && !dropdown.contains(e.target)){
                setProfileDropdownVisible(false)
            }
        })
    }

    const handleNewPostClick = () => {
        if(isAuthenticated){
            const modal = document.getElementById("modal-new-post")
            modal.style.display = "flex"
        } else {
            handleProfileClick()
        }

    }

    const handleProfileClick = () => {
        displayProfileDropdown()
        setOutsideClickListener()
    }

    useEffect(() => {
        if(props.userMetadata){
            utilities.returnFirebaseUsers()
            .then(result => result.filter(user => user.auth0ID === props.userMetadata.user_id)[0])
            .then(result => {
            if(result.profilePhotoURL !== undefined){
                setProfilePhoto(result.profilePhotoURL)
            }
            })
            .catch(error => console.log(error))
        }
    },[user,props.userMetadata])

    return (
    <div className="header">
        <div className="header-container">
            <Link to="/">
                <div className="header-logo">
                    <img src={Logo} alt="header logo"></img>
                </div>
            </Link>

            <div className="header-affordances">
                {isAuthenticated
                    ?   <div>
                            <img className="header-icon" src={Home} alt="home icon" />
                            <img className="header-icon" src={Upload} alt="upload icon" onClick={handleNewPostClick} />
                            <div className="profile-area">
                                <img className="profile-icon" src={profilePhoto} alt="profile icon" onClick={handleProfileClick} />
                                <ProfileDropdown
                                        userMetadata ={props.userMetadata}
                                        isDisplayed = {profileDropdownVisible}
                                />
                            </div>
                        </div>
                    
                    : isLoading 
                    ? <div className="profile-icon shimmer shimmer-wrapper"> </div>
                    : <button onClick={loginWithRedirect}>Log in or sign up</button> 
                }
                
                
            </div>
        </div>
        <Modal 
            id={"modal-new-post"}
            content={<SubmitPost
                userMetadata ={props.userMetadata}
                profilePhoto = {profilePhoto}
                corsProxy = {props.corsProxy}
            />}
        />
    </div>
    )
}

export default Header