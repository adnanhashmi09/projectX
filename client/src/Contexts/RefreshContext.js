import React, { Component, createContext } from 'react';
import { Context } from 'react';

const RefreshContext = createContext({
    refresh:1,
    setRefresh: () => {}
})
export default RefreshContext