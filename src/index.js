import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app"
import {Auth0Provider} from '@auth0/auth0-react'

firebase.initializeApp({
  apiKey: "AIzaSyAlDTL26DWfRRNfNqQH4bYY5kmf-DID6A4",
  authDomain: "instaclone-e49cb.firebaseapp.com",
  projectId: "instaclone-e49cb",
  storageBucket: "instaclone-e49cb.appspot.com",
  messagingSenderId: "55598028921",
  appId: "1:55598028921:web:3d326e12b8100f74685ca8"
})

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-koqpz026.us.auth0.com"
      clientId="6I521eyL6oLif8nNpjGWPf3GXJS5JNNl"
      redirectUri={window.location.origin}
      audience="https://dev-koqpz026.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
