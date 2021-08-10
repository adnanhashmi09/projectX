import React, { Component, createContext } from 'react';
import { Context } from 'react';

const AuthUserContext = createContext({
    refresh:1,
    setRefresh:()=>{},
    authUser:null,
    setAuthUser: () => {},
})
export default AuthUserContext