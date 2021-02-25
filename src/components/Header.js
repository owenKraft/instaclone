import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Logo from '../resources/icons/logo.png'
import Home from '../resources/icons/home_filled_icon.png'
import Share from '../resources/icons/share_icon.png'
import Liked from '../resources/icons/heart_icon.png'
import Profile from '../resources/icons/profile_icon.png'
import ProfileDropdown from './ProfileDropdown'

const Header = (props) => {
    const [profileDropdownVisible,setProfileDropdownVisible] = useState(false)

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

    const handleProfileClick = () => {
        displayProfileDropdown()
        setOutsideClickListener()
        console.log(profileDropdownVisible)
    }

    return (
        <div className="header">
            <div className="header-container">
                <Link to="/">
                    <div className="header-logo">
                        <img src={Logo} alt="header logo"></img>
                    </div>
                </Link>


                <div className="header-search">
                    <input className="search-input" placeholder="Search"></input>
                </div>

                <div className="header-affordances">
                    <img className="header-icon" src={Home} alt="home icon"></img>
                    <img className="header-icon" src={Share} alt="share icon"></img>
                    <img className="header-icon" src={Liked} alt="liked icon"></img>
                    <div>
                        <img className="profile-icon" src={Profile} alt="profile icon" onClick={handleProfileClick} />
                        <ProfileDropdown
                            isDisplayed = {profileDropdownVisible}
                        />
                    </div>
                    
                </div>
            </div>
   </div>
    )
}

export default Header