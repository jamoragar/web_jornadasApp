import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from './Config/Firebase';

const root = document.getElementById('root');

export const renderApp = (isAuthenticated, email, name, uid) => {
  ReactDOM.render(
      (<div className="App">
          <App authenticated={isAuthenticated} email={email} name={name} uid={uid} />
      </div>), root);
};

firebase.auth().onAuthStateChanged(userAuth => {
  if (userAuth) {
      const {email, displayName, uid } = userAuth;
      renderApp(true, email, displayName, uid);
  }else {
      renderApp(false, null, null, null);
  }
});
