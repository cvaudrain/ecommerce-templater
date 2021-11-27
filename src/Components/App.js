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
import axios from 'axios';
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
import DonateSuccess from './DonateSuccess';
// Admin App only
import AdminApp from "./AdminApp"
import AdminEditor from "./AdminEditor"
import AdminViewApps from "./AdminViewApps"
import AdminApproval from "./AdminApproval"
function App() {
  const [donateState,setDonateState] = useState({
    orgName:"QVRR Season of Giving",
    logo:"images/logo.png",
    headerText:"",
    headlineText:"",
    footerText:"QVRR",
    footerSubtext:"Rotary Club Affiliate"
}) //will receive via raised state from <Donate />

  function setRaisedState(raisedState){ //tied to prop function, receives and sets raised state
setDonateState(raisedState)
  }

  return (
    <div className="">
      <Routes>
{/* Public App */}
<Route path="/" element={<Layout/>} /> 
<Route index element = {<Donate
  raiseTemplateState = {setRaisedState}
/>} /> 
<Route path="campaign" element={<Donate
  raiseTemplateState = {setRaisedState}
/>} />  
<Route path="join" element={<Join
 inheritedTemplate={donateState}

/>} />  
<Route path="success" element={<DonateSuccess
  inheritedTemplate={donateState}
/>}/>
{/* Admin App */}
<Route path = "/admin" element={<AdminApp/>} />
<Route path= "/admin-editor" element={<AdminEditor/>} />
<Route path= "/admin-view-apps" element={<AdminViewApps/>} />
<Route path= "/admin-approval" element={<AdminApproval/>} />


      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;


