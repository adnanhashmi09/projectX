import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import axios from 'axios'
import AuthUserContext from '../../Contexts/AuthUserContext'
import AddIcon from '@material-ui/icons/Add';
import { Fab } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
// import Loader from './Loader'

function getModalStyle() {
const top = 50 
const left = 50 
return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height:'200px',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
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
    },
});

class SimpleModal extends Component{
constructor(props){
    super(props);
    this.state = {
        open:false,
        title:'',
        description:'',
        category:'',
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
        const setAuthUser = this.context.setAuthUser

        const send = {
            title:this.state.title,
            description:this.state.description,
            category:this.state.category,
            status:'Pending',
            dateIssued: new Date(),
        }
       
        const url = `/api/${authUser.uid}/addWork`
        axios.post(url,{
            work:[send]
        }).then((authUser)=>{
            setAuthUser(authUser.data);
            this.props.refreshTable();
        }).then( this.setState({isLoading:false}))
    
    }

    return (
        <div>
        {
            <Fab size = "medium" color="primary" clasaName = {classes.root} onClick = {handleOpen} disabled = {this.state.isLoading}>
            <AddIcon /> 
            </Fab>
        }

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Add Activity</h2>
                    <form onSubmit = {onSubmit} >
                        <label>
                            Title
                            <input type = "text" name = "title" onChange = {handleOnChange} required = "true"/>
                        </label>
                        <label>
                            Description
                            <input type = "text" name = "description" onChange = {handleOnChange} required = "true"/>
                        </label>
                        <label>
                            Category
                            <select name = "category" onChange = {handleOnChange} required = "true">
                                <option disabled selected value>Select</option>
                                <option value = "script">Script</option>
                                <option value = "online">Online</option>
                            </select>
                        </label>
                        <label>
                            <input type = 'submit'/>
                        </label>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
}
SimpleModal.contextType = AuthUserContext;
export default withStyles(useStyles)(SimpleModal)