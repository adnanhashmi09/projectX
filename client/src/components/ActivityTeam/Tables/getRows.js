import React from 'react';
import { useContext } from "react";
import TeamDataContext from '../../../Contexts/TeamDataContext';

const getRows = (status,teamData,authUser) =>{

    if(!teamData) return []
    let userActivity = []
    teamData.forEach(user => {
        //a user must only be able to see activities of their juniors
        if(user.currentYear >= authUser.currentYear) return
        user.work.forEach(activity =>{
            if(activity.status === status || status == 'Total') userActivity.push(createData(activity,user.name));
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