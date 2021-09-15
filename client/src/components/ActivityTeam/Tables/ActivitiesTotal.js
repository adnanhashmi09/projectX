import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import AuthUserContext from '../../../Contexts/AuthUserContext';
import { getRows } from './ProcessData';
import TeamDataContext from '../../../Contexts/TeamDataContext';
import GetTable from './getTable';
import Filters from './Filters';
import RefreshContext from '../../../Contexts/RefreshContext';

const CollapsibleTable = () => {
  //setting up props for filters
  const [status, setStatus] = useState('');
  const [user, setUser] = useState('');

  let props = {
    status,
    setStatus,
    user,
    setUser,
  };
  let filters = {
    status,
    user,
  };

  // rows has been initialized to an empty array
  const [rows, setRows] = useState([]);
  //this state is managed my add button component
  //whenever an update is made to the activity table, the add button toggles this state(via props)
  //then this table is renrended because use effect is listening to changes on refresh state.
  // const [refresh,setRefresh] = useState(false)
  // const refreshTable = () =>{
  //   setRefresh(!refresh);
  // }
  //response is the data sent back by the backend server.
  //useEffect re renders everytime [authUser,refresh] is changed.
  //this then rerenders the table and along with user's activities

  const authUser = useContext(AuthUserContext).authUser;
  const { refresh, setRefresh } = useContext(AuthUserContext);
  const teamData = useContext(TeamDataContext).teamData;

  useEffect(() => {
    // console.log(refresh)
    if (!authUser) return;
    const res = teamData;
<<<<<<< HEAD
=======

>>>>>>> personal-activity-page
    setRows(getRows(res, authUser, filters));
  }, [authUser, refresh, status, user, teamData]);

  return (
    <div>
      {/* this is the parent component for Filters and GetTable */}
      <Filters {...props} />
      <GetTable rows={rows} />
    </div>
  );
};
export default CollapsibleTable;
