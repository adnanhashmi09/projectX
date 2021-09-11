import React, { useCallback, useContext, useEffect } from 'react';
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
import AuthUserContext from '../../../Contexts/AuthUserContext';
import Modal from '../Modal';
import getRows from './getRows';

const useButtonStyles = makeStyles({
  outer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    // border : '2px solid black'
  },
  table: {
    width: '90%',
    border: '1px solid black',
  },
});

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
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
              <div>{row.history}</div>
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
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const CollapsibleTable = (props) => {
  // rows has been initialized to an empty array
  const [rows, setRows] = useState([]);
  const [isTableReady, setIsTableReady] = useState(false);
  //this state is managed my add button component
  //whenever an update is made to the activity table, the add button toggles this state(via props)
  //then this table is renrender because use effect is listening to changes on refresh state.
  const [refresh, setRefresh] = useState(false);
  const refreshTable = () => {
    setRefresh(!refresh);
  };
  //response is the data sent back by the backend server.
  //useEffect re-renders everytime [authUser,refresh] is changed.
  //this then re-renders the table and along with user's activities

  const authUser = useContext(AuthUserContext).authUser;
  useEffect(() => {
    const fetchRowData = async () => {
      setIsTableReady(false);
      if (!authUser) return;
      // const res = await axios.get(`/api/${authUser.uid}/getUserActivity`)
      const res = authUser.work;
      setRows(getRows('Approved', res));
      setIsTableReady(true);
    };
    fetchRowData();
  }, [refresh, authUser]);

  const classes = useButtonStyles();
  return (
    <div className={classes.outer}>
      <TableContainer component={Paper} class={classes.table}>
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
      <Modal refreshTable={refreshTable} isTableReady={isTableReady} />
    </div>
  );
};
export default CollapsibleTable;
