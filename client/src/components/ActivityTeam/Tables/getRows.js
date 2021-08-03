import React from 'react';
import { useContext } from "react";
import TeamDataContext from '../../../Contexts/TeamDataContext';

const getRows = (teamData,authUser,filters) =>{
    const status = filters.status;
    const getUser = filters.user;

    if(!teamData) return []
    let userActivity = []
    teamData.forEach(user => {
        //a user must only be able to see activities of their juniors
        if(user.currentYear >= authUser.currentYear) return
        if(getUser && getUser != user.name) return
        user.work.forEach(activity =>{
            if(status === '' || activity.status === status) userActivity.push(createData(activity,user.name));
        })
    });
    userActivity.reverse()
    return userActivity
}

function createData(doc,name) {
    const {title,description,category,status,dateIssued} = doc
    return {
      name,
      title,
      category,
      date:dateIssued ? dateIssued.substring(0,10) :'',
      status,
      history:description
    };
}
export default getRows;