import {useContext, useState,useEffect} from "react"
import { Switch, Route, Link, Redirect,useLocation,Outlet, useHistory } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"

// Middleware
import axios from "axios"

export default function AdminViewApps(props){
const user = {
  name:"Chris",
  id:1,
  email:"cvaudrain@gmail.com"
}

return(
    <div className="cloud-gradient">
<Header
logo={"images/logo.png"}
orgName={"QVRR Membership Applications"} 
subheading={`Hello, ${user.name}.`}
adminView={true}
/>
<div className="md-text pad-sm outfit-font centered ">
  <p>Active Requests</p>
</div>
<div className="container ">


</div>
<Footer />
</div>
)
}