import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileInfo = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-info">
          <div className="profile-icon-name">
            <img className="profile-icon" src={user.picture} alt={user.name} />
            <div className="profile-name">{user.name}</div>
          </div>

        <div className="profile-email">{user.email}</div>
      </div>
    )
  );
};

export default ProfileInfo;