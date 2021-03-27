import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import ProfileInfo from './ProfileInfo'
import Emoji from 'a11y-react-emoji'


const ProfileDropdown = (props) => {
    let isDisplayed = props.isDisplayed || false
    const { loginWithRedirect, logout } = useAuth0();
    // const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();

    let loginText
    if(isAuthenticated){
        loginText = "Log Out"
    } else {
        loginText = "Log In or Sign Up"
    }

    const handleLoginClick = () => {
        if(isAuthenticated){
            // logout({ returnTo: window.location.origin })
            logout({ returnTo: "https://owenkraft.github.io/instaclone/#/" })
        } else {
            // loginWithRedirect()
            loginWithRedirect({ redirect_uri: "https://owenkraft.github.io/instaclone/#/", response_type: "id_token"})
        }
    }

    return (
        isDisplayed && (
        <div className="profile-dropdown">
            {!isAuthenticated &&
                <div className="login-emoji">
                    <Emoji symbol="👋" label="hello" />
                </div> 
            }

            {isAuthenticated && (
                <ProfileInfo 
                    userMetadata = {props.userMetadata}
                />
            )}

            <button onClick={() => handleLoginClick()}>{loginText}</button>
        </div>
        )
    )
}

export default ProfileDropdown