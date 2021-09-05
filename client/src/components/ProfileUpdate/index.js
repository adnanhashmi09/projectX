import axios from 'axios';
import React, { Component } from 'react';
import { PROFILE_UPDATE } from '../../Constants/routes';
import AuthUserContext from '../../Contexts/AuthUserContext';
import FirebaseContext from '../Firebase/Context';

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            name:'',
            uid:'',
            currentYear:'',
            department :'',
        }
    }
    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const uid = this.context.auth.currentUser.uid;
        const url = `/api/${uid}/profile/update`;
        axios.post(url,{
            ...this.state
        }).catch(err =>{
            console.log(err)
        })
        ;
    }

    render(){
        // console.log(this.context.auth.currentUser.uid)
        return(
            <div>
                <form style = {{display:'flex',justifyContent:'space-between',flexDirection:'column',height:'100px'}} onSubmit = {this.onSubmit}>
                    <label>
                        Name
                        <br/>
                        <input name = 'name' value = {this.state.name} onChange = {this.onChange} />
                    </label>
                    <label>
                        Current Year
                        <br/>
                        <input name = 'currentYear' value = {this.state.currentYear} onChange = {this.onChange} />
                    </label>
                    <label>
                        Department
                        <br/>
                        <input name = 'department' value = {this.state.department} onChange = {this.onChange} />
                    </label>
                    <label>
                        <input type = "submit" disabled = {!this.context.auth.currentUser}/>
                    </label>
                </form>
            </div>
        )
    }
}
Profile.contextType = FirebaseContext
export default Profile;