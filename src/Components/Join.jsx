// Style
import '../App.css';
// React / Router
import React from "react"
import {useContext, useState,useEffect} from "react"
import { Switch, Route, Link, Redirect,useLocation,Outlet, useHistory } from "react-router-dom";
// Middleware
import axios from 'axios';
// Stripe?
// Components
import Header from "./Header" 
import Footer from "./Footer" 


function Join() {
  return (
    <div className="">
     
        
        <p>
          JOIN
        </p>
       
       
     
    </div>
  );
}

export default Join;