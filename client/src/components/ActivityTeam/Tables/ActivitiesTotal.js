import React, {useContext, useEffect } from 'react';
import { useState } from 'react';
import AuthUserContext from '../../../Contexts/AuthUserContext';
import getRows  from './getRows';
import TeamDataContext from '../../../Contexts/TeamDataContext';
import CreateTable from './getTable';


const CollapsibleTable = (props) =>{
  // rows has been initialized to an empty array
  const [rows,setRows] = useState([])
  const [isTableReady,setIsTableReady] = useState(false);
  //this state is managed my add button component
  //whenever an update is made to the activity table, the add button toggles this state(via props)
  //then this table is renrender because use effect is listening to changes on refresh state.
  const [refresh,setRefresh] = useState(false)
  const refreshTable = () =>{
    setRefresh(!refresh);
  }
  //response is the data sent back by the backend server.
  //useEffect re renders everytime [authUser,refresh] is changed.
  //this then rerenders the table and along with user's activities   

  const authUser = useContext(AuthUserContext).authUser;
  const teamData = useContext(TeamDataContext);

  useEffect(()=>{
    const fetchRowData = () =>{
      setIsTableReady(false)
      if(!authUser) return
      const res = teamData
      setRows(getRows("Total",res,authUser))
      setIsTableReady(true)
    }
    fetchRowData()
  },[authUser,refresh])                                               

  return (
    <CreateTable rows = {rows}/>
  )
}
export default CollapsibleTable
