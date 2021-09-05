import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Divider, Avatar, Grid, Paper, IconButton } from "@material-ui/core";
import TeamDataContext from "../../../../Contexts/TeamDataContext";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import AuthUserContext from "../../../../Contexts/AuthUserContext";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

// import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root:{
      margin: theme.spacing(1),
      // width: '25ch',
      display:'flex',
      alignItems:'center',
    },
  small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
}));

const GetComments = (data) => {
  //function to delete this comment
  const authUser = useContext(AuthUserContext).authUser;
  const {refresh,setRefresh} = useContext(AuthUserContext);
  const setTeamData = useContext(TeamDataContext).setTeamData;

  const deleteComment = (e) =>{
    console.log(e.currentTarget.value,'comment id')
    const url = `/api/${authUser.uid}/teamActivity/delete`;
    axios.post(url,{
      userId:data.userId,
      activityId:data._id,
      typeId : e.currentTarget.value,
      type:'comment'
    }).then((res)=>{
      console.log(res.data)
      setTeamData(res.data)
    }).catch((err)=>{
      console.log(err);
    })
    //refreshing here
    setRefresh()
  }
  const classes = useStyles();
  if(!data) return
  if(!data.comments) return 

  const comments = data.comments
  const name = data.name
  const res = comments.map(comment => {
    return (
    <div>
      <Grid container wrap="nowrap" spacing={2} style = {{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <div style = {{display:'flex',margin:'2px'}}>
          <Grid item style = {{margin:'5px'}}>
            <Avatar alt="net slow hai" src={imgLink} className = {classes.small} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth style = {{margin:'5px'}}>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.name}</h4>
            <p style={{ textAlign: "left" ,margin:'2px'}}>
              {comment.text}
            </p>
          </Grid>
        </div>
        <IconButton value = {comment._id} onClick = {deleteComment}>
            <DeleteIcon></DeleteIcon>
        </IconButton>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
      </div>
    )
  });
  return res;
}

const NewComment = (data)=>{
  // console.log(data)
  const classes = useStyles();

  const [text,setText] = useState("");
  const authUser = useContext(AuthUserContext).authUser;
  const {refresh,setRefresh} = useContext(AuthUserContext);
  const setTeamData = useContext(TeamDataContext).setTeamData;

  const onSubmit = (e)=>{
    e.preventDefault();
    setText("");
    const url = `/api/${authUser.uid}/teamActivity/addComment`;
    axios.post(url,{
      uid:data.userId,
      _id:data._id,
      name:authUser.name,
      text,
      time : Date.now(),
    }).then((res)=>{
      console.log(res.data)
      setTeamData(res.data)
    }).catch((err)=>{
      console.log(err);
    })
    //refreshing here
    setRefresh()
  }
  return(
    <Grid container wrap="nowrap" spacing={2}>
    <Grid item>
      <Avatar alt="Remy Sharp" src={imgLink} />
    </Grid>
    <Grid justifyContent="left" item xs zeroMinWidth>
      <h4 style={{ margin: 0, textAlign: "left" }}>{authUser.name}</h4>

      <form className={classes.root} noValidate autoComplete="off" onSubmit = {onSubmit} >
        <TextField
            style ={{width:'80%'}}
            id="outlined-textarea"
            size = "small"
            placeholder="This comment will be visible to the publisher of this activity"
            multiline
            value = {text}
            variant="outlined"
            onChange = {(e)=>{setText(e.target.value);}}
        />
        <IconButton color="primary" aria-label="approve" type = "submit" onClick = {onSubmit} >
          <SendIcon />
        </IconButton>
      </form>
    </Grid>
  </Grid>
  )
}
const imgLink = "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

function App(props) {
  const {data} = props;
  const {refresh} = useContext(AuthUserContext);
  //process commments
  useEffect(()=>{
    console.log(data,'refreshed');
  },[data])

  return (
    <div style={{ }} className="App">
      <h2>Comments</h2>
        <Paper style={{ padding: "20px 10px" }}>
        {GetComments(data)}
        {NewComment(data)}
      </Paper>
    </div>
  );
}

export default App;