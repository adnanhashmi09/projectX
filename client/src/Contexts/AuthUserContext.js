import React, { Component, createContext } from 'react';
import { Context } from 'react';

const AuthUserContext = createContext({
    authUser:null,
    setAuthUser: () => {}
})
export default AuthUserContext