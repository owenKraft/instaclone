import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import ProfileInfo from './ProfileInfo'

const Authentication = (props) => {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();

    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
        <div className="test-auth">
            <button onClick={() => loginWithRedirect()}>Login</button>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>

            <ProfileInfo />
        </div>
    )
}

export default Authentication