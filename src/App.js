import React, {useState, useEffect} from 'react'
import firebase from 'firebase';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import Header from './components/Header'
import { HashRouter, Switch, Route} from "react-router-dom"
import Body from './components/Body'
import Utilities from './components/Utilities'

const App = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken,setAccessToken] = useState()
  const [userMetadata, setUserMetadata] = useState(null)
  const utilities = Utilities()
  const corsProxy = "https://whispering-inlet-34281.herokuapp.com/"


  useEffect(() => {
    getUserMetadata()
    // .then(console.log("user metadata = ", userMetadata))
    .then(utilities.returnFirebaseUsers())
  },[user])

  const getUserMetadata = async () => {
    const domain = "dev-koqpz026.us.auth0.com";

    getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user",
    })
    .then(accessToken => {
      setAccessToken(accessToken)
      return accessToken
    })
    .then(accessToken => {
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`
      return fetch(userDetailsByIdUrl, 
        {
          headers: 
            {
              Authorization: `Bearer ${accessToken}`,
            },
        }
      )
    })
    .then(metadataResponse => {
      return metadataResponse.json();
    })
    .then(response => {
      // setUserMetadata(response, console.log("user metadata = ", response.user_metadata))
      setUserMetadata(response)
    })
    // .then(console.log(userMetadata))
    .catch(e => {
      console.log(e.message)
    })
  }

  return (
    <div className="app">
      {/* <HashRouter basename="/instaclone"> */}
      <HashRouter>
        <Switch>
          <Route 
            path="/" exact
            render={(props) => (
              <div>
                <Header
                  accessToken = {accessToken}
                  userMetadata = {userMetadata}
                  corsProxy = {corsProxy}
                />
                <Body 
                  accessToken = {accessToken}
                  userMetadata = {userMetadata}
                  corsProxy = {corsProxy}
                />
              </div>
            )}
          />
          {/* <Route 
            path="/new" exact
            render={(props) => (
              <div>
                <Header
                />
                <SubmitPost 
                />
              </div>
            )}
          />
          <Route 
            path="/register" exact
            render={(props) => (
              <div>
                <Register 
                />
              </div>
            )}
          /> */}
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
