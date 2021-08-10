import React from 'react';
import { useContext } from "react";
import TeamDataContext from '../../../Contexts/TeamDataContext';

export const getRows = (teamData,authUser,filters)=>{
    const filteredData = filterData(teamData,authUser,filters)
    const rowData = getRowData(filteredData)
    return rowData;
}

export const filterData = (teamData,authUser,filters) =>{
    //applies filters and sends a list of activities
    const status = filters.status;
    const getUser = filters.user;

    if(!teamData) return []
    let filteredData = []
    teamData.forEach(user => {
        //a user must only be able to see activities of their juniors
        if(user.currentYear >= authUser.currentYear) return
        if(getUser && getUser != user.name) return
        user.work.forEach(activity =>{
            if(status === '' || activity.status === status) {activity.name = user.name ; activity.userId = user.uid ;filteredData.push(activity)};
        })
    });
    filteredData.reverse()
    return filteredData
}

export function getRowData(data){
    const rowData = [];
    if(!data) return
    data.forEach(doc=>{
        const {title,description,category,status,dateIssued,name,comments,_id,userId} = doc
        const res = {
          userId,
          _id,
          name,
          title,
          category,
          date:dateIssued ? dateIssued.substring(0,10) :'',
          status,
          history:description,
          comments,
        };
        rowData.push(res)
    })
    return rowData;
}
// export default{ getRows,filterData};