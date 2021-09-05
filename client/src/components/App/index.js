import React, { Component } from 'react';
import * as ROUTES from '../../Constants/routes'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignInPage from '../SignIn'
import Drawer from '../Drawer'
import axios from 'axios'
import FirebaseContext from '../Firebase/Context';
import { Link } from 'react-router-dom';
import AuthUserContext from '../../Contexts/AuthUserContext';
import TeamDataContext from '../../Contexts/TeamDataContext';
import ProfileUpdate from '../ProfileUpdate';
import RefreshContext from '../../Contexts/RefreshContext';


class App extends Component{
    constructor(){
      super();
      this.state = {
        res:null,
        userData:null,
        authUser :null,
        refresh :1,
        teamData:[],
      }
    }
    setupContexts = (authUser) =>{
      console.log('setting up contexts')

      axios.get(`/api/${authUser.uid}/getUser`).then( (res)=> {
        this.setState({authUser:res.data})
      }).then(
        axios.get('/api/getTeamData').then((res)=>{
          this.setState({teamData:res.data})
        })
      ).catch((err)=>{
        console.log(err)
      })
    }
    componentDidMount(){
      
      let firebase = this.context;
      // this is a listener
      //it changes the state every time someone logs-in or logs-out.
      this.listener = firebase.auth.onAuthStateChanged(authUser=>{
        authUser 
          ? this.setupContexts(authUser)
          : this.setState({authUser:null})
        //second opertation
        //this fethes the currentUser from backend and sets the state
      });
      
    }
    componentWillUnmount(){
      this.listener();
    }
  
  render(){
    let firebase = this.context;
    console.log('app refreshed')
    return(
      <AuthUserContext.Provider value = {{
        authUser:this.state.authUser,
        setAuthUser:(authUser)=>{this.setState({authUser})},
        refresh:this.state.refresh,
        setRefresh:() => {this.setState({refresh:!this.state.refresh})}
        }}>
        <Router>
          <div>
            <TeamDataContext.Provider value = {{
               teamData : this.state.teamData,
               setTeamData : (teamData)=>{this.setState({teamData})}
            }}>
              {/* <RefreshContext.Provider value = {{refresh:this.state.refresh,setRefresh : ()=>{this.setState({refresh:!this.state.refresh})}}}> */}
                <Route  path = "/home" render = {() =><Drawer/> }/>
                <Route exact path = {ROUTES.SIGN_IN} component = {SignInPage}/>
                <Route exact path = {ROUTES.PROFILE_UPDATE} component = {ProfileUpdate}/>
               {/* </RefreshContext.Provider> */}
            </TeamDataContext.Provider>
          </div>
      </Router>
    </AuthUserContext.Provider>
    )
  }
};
App.contextType = FirebaseContext

  
export default App
