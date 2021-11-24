import Header from "./Header"
import Footer from "./Footer"
import Join from "./Join"
import Card from "./Card"
import {useContext, useState,useEffect} from "react"
import { Switch, Route, Link, Redirect,useLocation,Outlet, useHistory } from "react-router-dom";

 function Donate(props){
// set from api call to server-side DB query for template object (custom values set from admin panel)
    const [template,setTemplate] = useState({
        orgName:"QVRR Season of Giving",
        logo:"images/logo.png",
        headerText:"",
        headlineText:"",
        footerText:"QVRR",
        footerSubtext:"Rotary Club Affiliate",
        card1Price:5,
        card2Price:10,
        card3Price:20,
        card4Price:50,
        card1Title:"$5 Donation",
        card2Title:"$10 Donation",
        card3Title:"$20 Donation",
        card4Title:"$50 Donation",
        card1Text:"A donation for $5",
        card2Text:"A donation for $10",
        card3Text:"A donation for $20",
        card4Text:"A donation for $50",
        isRendered:{
            card1:true,
            card2:true,
            card3:true,
            card4:true,
            card5:false,
            card6:false,
            card7:false,
            card8:false
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
        />
        <div className=" snowflake-br pad-b-sm">
        <div className="container">
            <div className="row">
            {/* <Card /> contains col-breakpoint bootstrap classes*/}
            <Card
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