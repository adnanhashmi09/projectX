import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import FirebaseContext from './components/Firebase/Context'
import firebase from './components/Firebase'

ReactDOM.render(
  <FirebaseContext.Provider value = {new firebase()}>
      <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
