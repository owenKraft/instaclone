import firebase from 'firebase'

const Utilities = () => {
    const usersRef = firebase.database().ref('users')

    const returnUserFirebaseID = (allUsers,userAuth0ID) => {
        console.log(allUsers,userAuth0ID)
        const thisUser = allUsers.filter(user => user.auth0ID === userAuth0ID)[0]
        console.log(thisUser)

        return thisUser.id
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
                        auth0ID: users[user].auth0ID,
                        profilePhotoURL: users[user].profilePhotoURL
                    })
                }
            })
            // console.log(allUsers)
            resolve(allUsers)
        })

        return promise
    }

    function truncateText(str, clickFunction, length, ending){
        if (length == null) {
            length = 100;
        }

        if (ending == null){
            ending =    <span className="more-text" onClick={clickFunction}>
                            ... more
                        </span>
        }
        if (str.length > length) {
            const newStr = str.substring(0, length - 5)
            return <span>{newStr} {ending}</span>
        } else {
            return str;
        }
    }

    return {
        returnUserFirebaseID,
        returnFirebaseUsers,
        truncateText
    }
}

export default Utilities