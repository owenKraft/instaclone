import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import firebase from 'firebase'
import WelcomeModal from './WelcomeModal';

const Register = (props) => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [accessToken,setAccessToken] = useState(props.accessToken)
    const [usernameSubmitted,setUserNameSubmitted] = useState(false)
    const [username,setUsername] = useState()
    const usersRef = firebase.database().ref('users')

    useEffect(() => {
        returnFirebaseUsers()
    },[user])

    const createNewFirebaseUser = (user,username) => {
        const newUser = {
            username: username,
            auth0ID: user.sub
        }
        usersRef.push(newUser)
    }

    const updateExistingFirebaseUser = (id,username) => {
        usersRef.child(id).update({'username' : username})
    }

    const returnUserFirebaseID = (allUsers,userAuth0ID) => {
        const thisUser = allUsers.filter(user => user.auth0ID === userAuth0ID)[0]

        return thisUser.id
    }

    const checkIfAuth0IDExistsInFirebase = (myUser,allUsers) => {
        const thisUser = allUsers.filter(user => user.auth0ID === myUser.sub)

        if(thisUser.length > 0){
            console.log("Auth0ID already exists")
            return true
        } else {
            return false
        }
    }

    const checkIfUsernameExists = (allUsers,username,id) => {
        const thisUser = allUsers.filter(user => user.username === username)
        if(thisUser.length > 0){
            throw Error("username already exists")
        } else {
            return allUsers
        }
    }

    const returnFirebaseUsers = async () => {
        const promise = new Promise((resolve,reject) => {
            let allUsers = []

            usersRef.on('value', (snapshot) => {
                let users = snapshot.val()
                for(let user in users){
                    allUsers.push({
                        id: user,
                        username: users[user].username,
                        auth0ID: users[user].auth0ID
                    })
                }
            })
            resolve(allUsers)
        })

        return promise
    }

    const submitUsername = async (e) => {
        const username = document.getElementById("username").value

        returnFirebaseUsers()
        .then(result => checkIfUsernameExists(result,username))
        .then(result => {
            if(checkIfAuth0IDExistsInFirebase(user,result)){
                const firebaseID = returnUserFirebaseID(result,user.sub)
                updateExistingFirebaseUser(firebaseID,username)
            } else {
                createNewFirebaseUser(user,username)
            }
        })
        .then(() => returnFirebaseUsers())
        .then(result => {
            const firebaseID = returnUserFirebaseID(result,user.sub)
    
            var options = {
                method: 'PATCH',
                url: `https://dev-koqpz026.us.auth0.com/api/v2/users/${user.sub}`,
                headers: {authorization: `Bearer ${accessToken}`, 'content-type': 'application/json'},
                data: {user_metadata: {
                    username: username,
                    firebaseID: firebaseID
                }}
                };
                
                axios.request(options)
                .then(function (response) {
                    console.log(response.data)
                    setUserNameSubmitted(true)
                    setUsername(username)
                }).catch(function (error) {
                console.error(error);
            });
        })
        .then(closeUsernameModal("username-modal"))
        .catch(error => {
            if(error.message === "username already exists"){
                alert(error.toString())
            } else {
                console.log(error)
            }
        })
    }

    const handleTextInput = (e) => {
        const username = document.getElementById("username").value
        const submitBtn = document.querySelector(".add-username-btn")

        if(username !== ""){
            submitBtn.classList.remove("disabled")
        } else if(username === ""){
            submitBtn.classList.add("disabled")
        }
    }

    const closeUsernameModal = (modalName) => {
        if(usernameSubmitted === true){
            const usernameModal = document.querySelector(`.${modalName}`).closest(".modal")
            usernameModal.style.display = "none"
        }
    }

    const handleSubmitClick = (e) => {
        e.preventDefault()
        submitUsername()
    }

    if(isAuthenticated && usernameSubmitted === true){
        return (
            <WelcomeModal
                username = {username}
                auth0ID = {user.sub}
                returnFirebaseUsers = {returnFirebaseUsers}
                returnUserFirebaseID = {returnUserFirebaseID}
                corsProxy = {props.corsProxy}
            />
        )
    }

    return (
        isAuthenticated && (
            <div className="username-modal">
                <h1>Add a username to get started</h1>
                <p>Your username will be displayed for all of your posts, comments, and likes</p>
                <form>
                    <input type="text" id="username" className="add-username-input" placeholder="Username" onInput={(e) => handleTextInput(e)} maxlength="25" required/>
                    <input type="submit" className="add-username-btn disabled" onClick={(e) => handleSubmitClick(e)} />
                </form>
            </div>
        )
    )
}

export default Register