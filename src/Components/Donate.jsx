import Header from "./Header"
import Footer from "./Footer"
import Join from "./Join"
import Card from "./Card"
import {useContext, useState,useEffect} from "react"
import { Switch, Route, Link, Redirect,useLocation,Outlet, useHistory } from "react-router-dom";
// Middleware
import axios from "axios"


 function Donate(props){
// set from api call to server-side DB query for template object (custom values set from admin panel)
useEffect(()=>{
    axios.get("/api/loadDonateTemplate").then((res)=>{
        console.log(res.data)
        setTemplate(res.data)
    }).catch((err)=>console.log(err))
},[])
    const [template,setTemplate] = useState({
        templateName:"loading",
        currentTemplate:null,
        orgName:"loading",
        logo:"loading",
        headerText:"loading",
        headlineText:"loading",
        footerText:"loading",
        footerSubtext:"loading",
        card1Price:0,
        card2Price:0,
        card3Price:0,
        card4Price:0,
        card1Title:"loading",
        card2Title:"loading",
        card3Title:"loading",
        card4Title:"loading",
        card1Text:"loading",
        card2Text:"loading",
        card3Text:"loading",
        card4Text:"loading",
        isRendered:{
            card1:null,
            card2:null,
            card3:null,
            card4:null,
            card5:null,
            card6:null,
            card7:null,
            card8:null
        }
    })

    useEffect(()=>{ //raise Donate Page template state to parent <App /> on state update
        props.raiseTemplateState(template)
    },[template])
  
    function stripeInit(ev,amount){
        // let amount = this.
        console.log(amount) //in USD, convert to cnets for stripe on server side
    }

    return(
        <div className="">
        <Header
         orgName={template.orgName}
         logo={template.logo}
         subheading={""}
        />
        <div className=" snowflake-br pad-b-sm">
        <div className="container">
            <div className="row">
            {/* <Card /> contains col-breakpoint bootstrap classes*/}
            <Card
            // title={template.card1Title} use for a STORE- for donations, amt is sufficient
            title={template.card1Title}
            description={template.card1Text}
            price={template.card1Price}
            stripeInit = {()=>stripeInit}
            />
            
            <Card
            title={template.card2Title}
            description={template.card2Text}
            price={template.card2Price}
            stripeInit = {()=>stripeInit}
            />
           
            <Card
            title={template.card3Title}
            description={template.card3Text}
            price={template.card3Price}
            stripeInit = {()=>stripeInit}
            />
            
            <Card
            title={template.card4Title}
            description={template.card4Text}
            price={template.card4Price}
            stripeInit = {()=>stripeInit}
            />
           
            </div>
            
        </div>
        </div>
        <Footer
        footerText={template.footerText}
        footerSubtext={template.footerSubtext}

        />
        </div>
    )
}

export default Donate;