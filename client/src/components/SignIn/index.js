import React, { Component } from 'react';
import { Router, Link, Redirect } from 'react-router-dom';
import FirebaseContext from '../Firebase/Context';
import * as ROUTES from '../../Constants/routes'


const INITIAL_STATE = {
    email : '',
    password : '',
    error : null,
    redirect : false,
}

class SignInForm extends Component{
    constructor(){
        super()
        this.state = {...INITIAL_STATE}
    }
    onSubmit = (e) => {
        const {email,password} = this.state
        e.preventDefault()
        //check if the email exists in databse(added manually)
        let firebase = this.context
        firebase
        .doSignInWithEmailAndPassword(email,password)
        .then((user)=>{
            // console.log(user)
            this.setState({...INITIAL_STATE})
            this.setState({redirect:true})
        })
        .catch(error=>{
            this.setState({error})
        })
    }
    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === ''

        // if(this.state.redirect){
        //     return(
        //         <Redirect to = {ROUTES.HOME}/>
        //     )
        // }
        return(
            <form onSubmit = {this.onSubmit}>
                <input 
                name = "email"
                value = {email}
                onChange = {this.onChange}
                type = "text"
                placeholder ="Email Address"
                />
                <input 
                name = "password"
                value = {password}
                onChange = {this.onChange}
                type = "password"
                placeholder ="Password"
                />
                <button disabled = {isInvalid}>Sign In</button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
};
SignInForm.contextType = FirebaseContext;
export default SignInForm
