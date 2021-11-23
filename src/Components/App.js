// Style
import '../App.css';
// React / Router
import React from "react"
import {useContext, useState,useEffect} from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useHistory,
  Outlet
} from "react-router-dom";

// Middleware
// import axios from 'axios';
// Stripe?
// Components
// Public / Main App Landing
import Layout from "./Layout"
import Header from "./Header" 
import Footer from "./Footer" 
import PublicApp from "./PublicApp" 
import Card from "./Card" 
import Join from "./Join" 
import Donate from "./Donate" 

// Admin App only
import AdminApp from "./AdminApp"

function App() {
  return (
    <div className="">
      <Routes>
{/* Public App */}
<Route path="/" element={<Layout/>} /> 
<Route index element = {<Donate/>} /> 
<Route path="campaign" element={<Donate/>} />  
<Route path="join" element={<Join/>} />  

{/* Admin App */}
<Route path = "/admin" element={<AdminApp/>} />


      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;


