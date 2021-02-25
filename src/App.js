import React from 'react';
import firebase from 'firebase';
import './App.css';
import Header from './components/Header'
import { HashRouter, Switch, Route} from "react-router-dom"
import Body from './components/Body'

function App() {

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
                />
                <Body 
                />
              </div>
            )}
          />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
