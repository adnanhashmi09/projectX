import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { useState } from 'react';

const useButtonStyles = makeStyles({
    outer:{
        display:'flex',
        justifyContent:'space-evenly',
        width:'100%',
        // border : '2px solid black'
    },
    table:{
        width:'90%',
        border:'1px solid black'
    },
})

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(doc) {
  const {title,description,category} = doc
  console.log('category',category)
  const date = '11/01/19';
  const status = 'approved'
  return {
    title,
    category,
    date,
    status,
    history: [
        { date: '2020-01-05', customerId: '11091700', amount: 3 },
        { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
      ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
    
    <TableRow className={classes.root}>
    <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
    </TableCell>
    <TableCell component="th" scope="row">
        {row.title}
    </TableCell>
    <TableCell align="right">{row.category}</TableCell>
    <TableCell align="right">{row.date}</TableCell>
    <TableCell align="right">{row.status}</TableCell>
    </TableRow>
    <TableRow>
    {/* dropdown */}
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
            History
            </Typography>
            <div>This is the description of the Work</div>
        </Box>
        </Collapse>
    </TableCell>
    </TableRow> 
</React.Fragment>
);
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const getRows = async() =>{
  const response = await axios.get('/api/getUsers')
  const data = response.data[0].work;
  // console.log('data',data) 
  let res = []
  data.forEach(doc => {
    res.push(createData(doc));
  });
  return res
}

const CollapsibleTable = () =>{

  // rows has been initi qalized to an empty array
  const [rows,setRows] = useState([])
  //useEffect fetches the data from backend server(vis getRows) and updates the state upon receiving
  //this then rerenders the table and along with user's activities                                                     
  useEffect(()=>{
    async function fetchData(){
      try{
        const data = await getRows()
        setRows(data)
      }catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  const classes = useButtonStyles()
  return (
    <div className = {classes.outer}>
      
        <TableContainer component={Paper} class = {classes.table}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>Title</TableCell>
                <TableCell align="right">Department</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <Row key={row.name} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Fab size = "medium" color="primary" clasaName = {classes.root} >
            <AddIcon />
        </Fab>
    </div>
  );
}
export default CollapsibleTable
