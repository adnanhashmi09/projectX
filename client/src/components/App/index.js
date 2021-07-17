import React, { Component } from 'react';
import * as ROUTES from '../../Constants/routes'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from '../Home'
import SignInPage from '../SignIn'
import axios from 'axios'

class App extends Component{
    // console.log(ROUTES.HOME)
    constructor(){
      super();
      this.state = {
        res:null,
      }
    }
    // test = async() =>{
    //   const res =  await axios.get('/api/getUsers')
    //   console.log(res.data[0].name)
    // }
  
  render(){
    return(
      <Router>
      <div>
        <Route exact path = {ROUTES.SIGN_IN} component = {SignInPage}/>
        <Route exact path = {ROUTES.HOME} component = {HomePage}/>
      </div>
    </Router>
    )
  }
};

  
export default App
