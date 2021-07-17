import React, { Component } from 'react';
import AppBar from './Components/AppBar'
import WorkTab from './Components/WorkTab'
import './Styles/OuterDiv.css'

export default function Home(){
    // document.body.style.marginTop = '0px';
    return (
        <div>
            <AppBar/>
            <WorkTab/>
        </div>
    )
};