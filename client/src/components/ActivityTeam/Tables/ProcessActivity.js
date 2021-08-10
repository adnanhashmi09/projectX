import React, { Component, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import { Fab } from "@material-ui/core";
import AuthUserContext from "../../../Contexts/AuthUserContext";
import CommentBox from './CommentBox'
import DoneIcon from '@material-ui/icons/Done';
import Done from "@material-ui/icons/Done";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
// import Loader from './Loader'

function getModalStyle() {
const top = 50 
const left = 50 
return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    // height:'200px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',  
    justifyContent:'center',
};
}

const useStyles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: 'white',
        padding:'20px',
        height:'20%',
        border:'1px black solid '
    },
});

class SimpleModal extends Component{
constructor(props){
    super(props);
    this.state = {
        open:false,
        value:'',
        verdict: 'toBeDecided',
        // isLoading:!props.isTableReady,
    }
}
render(){
    const {classes} = this.props;
    const modalStyle = getModalStyle();

    const handleOpen = () => {
        this.setState({open:true});
    };

    const handleClose = () => {
        this.setState({open:false});
    };

    const handleOnChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    const onSubmit = (e) =>{
        e.preventDefault()
        handleClose();
        const authUser = this.context.authUser
        if(!authUser) return 

        const setAuthUser = this.context.setAuthUser
        const send = {
            verdict:this.state.verdict,
            text:this.state.value,
            uid:authUser.uid,
            activityId:""
        }
        const url = `/api/${authUser.uid}/processActivity`;
        axios.post(url,{work:send}).then((res)=>{
            console.log('inside response')
        });
    }
    return (
        <div>
        {
            <button size = "medium" color="primary" clasaName = {classes.root} onClick = {handleOpen} disabled = {this.state.isLoading}>
                Process
            </button>
        }

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper} >

                    <h2>Process Activity</h2>
                    <form onSubmit = {onSubmit} style = {{width:'100%',display:'flex',justifyContent:'center',marginBottom:'20px',alignItems:'center'}}>
                        <TextField
                            id="outlined-textarea"
                            label="Private Comment"
                            // placeholder="Say something about this activit"
                            multiline
                            variant="outlined"
                            value = {this.state.value}
                            onChange = {(e)=>this.setState({value:e.target.value})}
                            style = {{width:'80%'}}
                            size = 'small'
                        />
                        <IconButton color="secondary" aria-label="approve" type = "submit" onClick = {()=>{this.setState({verdict:'deny'})}}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="approve" type = "submit" onClick = {()=>{this.setState({verdict:'approve'})}}>
                            <DoneIcon />
                        </IconButton>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
}
SimpleModal.contextType = AuthUserContext;
export default withStyles(useStyles)(SimpleModal)