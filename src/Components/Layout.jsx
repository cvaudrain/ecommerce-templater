import Header from "./Header"
import Footer from "./Footer"
import Join from "./Join"
import Donate from "./Donate"
import {useContext, useState,useEffect} from "react"
import { Switch, Route, Link, Redirect,useLocation,Outlet, useHistory } from "react-router-dom";
 function Layout(props){

    
    return(
        <div>
        <Header
        //  orgName={template.orgName}
        />
        <main>
        <Outlet/>
        </main>
        <Footer/>
        </div>
    )
}
export default Layout