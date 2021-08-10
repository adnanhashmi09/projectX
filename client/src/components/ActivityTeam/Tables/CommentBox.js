import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import TeamDataContext from "../../../Contexts/TeamDataContext";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import AuthUserContext from "../../../Contexts/AuthUserContext";

// import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const getComments = (data)=>{
  if(!data) return
  if(!data.comments) return 
  const comments = data.comments
  const name = data.name
  const res = comments.map(comment => {
    return (
    <div>
      <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar alt="net slow hai" src={imgLink} />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: "left" }}>{comment.name}</h4>
        <p style={{ textAlign: "left" }}>
          {comment.text}
        </p>
      </Grid>
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
      <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>

      <form className={classes.root} noValidate autoComplete="off" onSubmit = {onSubmit}>
        <TextField
            style ={{width:'80%'}}
            id="outlined-textarea"
            size = "small"
            placeholder="Placeholder"
            multiline
            value = {text}
            variant="outlined"
            onChange = {(e)=>{setText(e.target.value);}}
          />
          <label>
            <input type = 'submit' disabled = {!authUser}/>
          </label>
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
        {getComments(data)}
        {NewComment(data)}
      </Paper>
    </div>
  );
}

export default App;