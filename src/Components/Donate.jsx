import Header from "./Header"
import Footer from "./Footer"
import Join from "./Join"
import Card from "./Card"
import {useContext, useState,useEffect} from "react"
import { Switch, Route, Link, Redirect,useLocation,Outlet, useHistory } from "react-router-dom";

 function Donate(props){

    const [template,setTemplate] = useState({
        orgName:"QVRR Fundraiser",
        headerText:"",
        headlineText:"",
        footerText:"QVRR",
        footerSubtext:"Rotary Club Affiliate",
        card1Title:"$5",
        card2Title:"$10",
        card3Title:"$20",
        card4Title:"$50",
        card1Text:"A donation for $5",
        card2Text:"A donation for $10",
        card3Text:"A donation for $20",
        card4Text:"A donation for $50",
    })
    return(
        <div className="">
        <Header
         orgName={template.orgName}
        />
        <main>
        <div className="container">
            <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Card
            amount={template.card1Title}
            description={template.card1Text}
            />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Card
            amount={template.card2Title}
            description={template.card2Text}
            />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Card
            amount={template.card3Title}
            description={template.card3Text}
            />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Card
            amount={template.card4Title}
            description={template.card4Text}
            />
            </div>
            </div>
            
        </div>
        </main>
        <Footer
        footerText={template.footerText}
        footerSubtext={template.footerSubtext}

        />
        </div>
    )
}

export default Donate;