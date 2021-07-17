import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import FirebaseContext from './components/Firebase/Context'
import firebase from './components/Firebase'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <FirebaseContext.Provider value = {new firebase()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
