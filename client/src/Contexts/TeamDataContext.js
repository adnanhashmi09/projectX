import React, { Component, createContext } from 'react';
import { Context } from 'react';

const TeamDataContext = createContext({
    teamData:null,
    setTeamData:()=>{}
})
export default TeamDataContext