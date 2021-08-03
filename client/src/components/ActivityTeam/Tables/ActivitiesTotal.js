import React, {useContext, useEffect } from 'react';
import { useState } from 'react';
import AuthUserContext from '../../../Contexts/AuthUserContext';
import getRows  from './getRows';
import TeamDataContext from '../../../Contexts/TeamDataContext';
import GetTable from './getTable';
import Filters from './Filters'

const CollapsibleTable = () =>{

  //setting up props for filters
  const [status,setStatus] = useState('')
  const [user,setUser] = useState('');
  let props = {
    status,
    setStatus,
    user,
    setUser
  }
  let filters = {
    status,
    user,
  }

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
      console.log(filters)
      setIsTableReady(false)
      if(!authUser) return
      const res = teamData
      setRows(getRows(res,authUser,filters));
      setIsTableReady(true)

  },[authUser,refresh,status,user])                                               

  return (
    <div>
      {/* this is the parent component for Filters and GetTable */}
      <Filters {...props}/>
      <GetTable rows = {rows}/>
    </div>
  )
}
export default CollapsibleTable
