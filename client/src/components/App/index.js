import React, { Component } from 'react';
import * as ROUTES from '../../Constants/routes'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignInPage from '../SignIn'
import Drawer from '../Drawer'
import axios from 'axios'
import ActivityContext from '../../Contexts/ActivityContext';

class App extends Component{
    constructor(){
      super();
      this.state = {
        res:null,
        data:null,
      }
    }
    componentDidMount(){
      axios.get('/api/getUsers').then(res =>{
        const data = res.data[0];
        this.setState({data});
      })
    }
  
  render(){
    return(
      <Router>
        <div>
          <ActivityContext.Provider value =  {this.state.data}>
            <Route  path = "/home" render = {() =><Drawer/> }/>
            <Route exact path = {ROUTES.SIGN_IN} component = {SignInPage}/>
          </ActivityContext.Provider>
        </div>
    </Router>
    )
  }
};

  
export default App
