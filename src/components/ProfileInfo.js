import React, {useState,useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Utilities from './Utilities'


const ProfileInfo = (props) => {
  const utilities = Utilities()
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [firebaseID,setFirebaseID] = useState("")
  const [username,setUsername] = useState("")
  
  useEffect(() => {
    if(props.userMetadata && props.userMetadata.hasOwnProperty("user_metadata") && props.userMetadata.user_metadata.hasOwnProperty("username")){
      setUsername(props.userMetadata.user_metadata.username)
    }
  },[props.userMetadata])
  

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-info">
          <div className="profile-icon-name">
            <div className="profile-name">{username}</div>
          </div>

        <div className="profile-email">{user.email}</div>
      </div>
    )
  );
};

export default ProfileInfo;