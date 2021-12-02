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
const [template,setTemplate] = useState({
    templateName:"loading",
    currentTemplate:true,
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
    howMany:0,
    backgroundImage:""
    // howManyArray:[]
})

// Change to a parent-inhereited prop value...
const navObj = {
    admin:{
nav1:"/admin",
nav1Text:"Admin-Home",
        nav2:"/",
        nav2Text:"Homepage"
    },
    public: {
      nav1:"/join",
      nav1Text:"Join",
        nav2:"",
        nav2Text:""
    }
}

useEffect(()=>{
    axios.get("/api/loadDonateTemplate").then((res)=>{
        console.log("DATA")
        console.log(res.data)
        setTemplate(res.data)
    }).catch((err)=>console.log(err))
},[])
    
   
    useEffect(()=>{ //raise Donate Page template state to parent <App /> on state update
        props.raiseTemplateState(template)
      

// This for loop will set an array to whatever length equals the number of howMany selected,
//thereby allowing us to use an expression of map() function to render correct amount, since we cannot use 
//a for loop inside JSX

    },[template])

    let howManyArray = []
    for(var i=0;i<template.howMany;i++){
        howManyArray.push({
            title:"",
            card:"",
            price:""
        })
    }
    function stripeInit(ev,amount){
        // let amount = this.
        console.log(amount) //in USD, convert to cnets for stripe on server side
    }

    return(
        <div className="">
        <Header
         orgName={template.orgName}
         logoImgSrc={template.logo.imgSrc}
         logoContentType={template.logo.contentType}
         subheading={template.headerText}
         nav1Text={navObj.public.nav1Text}
nav1={navObj.public.nav1}
nav2Text={navObj.public.nav2Text}
nav2={navObj.public.nav2}
headerColor={template.headerColor}
        />          
        {/* style attr sets background to dynamic backgroundImage src url depending on the state of the DB template as set by admins */}
        <div className=" pad-b-sm" style={{background:"url(" + `data:image/${template.backgroundImage.contentType};base64,${template.backgroundImage.imgSrc }` + ")"  } ||{url:"images/br-gray.png"} }>
        <div className="container">
            <div className="row">
            {/* <Card /> contains col-breakpoint bootstrap classes*/}
            {howManyArray.map((n,i)=>{      
return (
     <Card
     cardColor={template.cardColor}
cardButtonColor={template.cardButtonColor}
        title={ eval(`template.card${i+1}Title`)}
        description={eval(`template.card${i+1}Text`)}
        price={eval(`template.card${i+1}Price`)}
        stripeInit = {()=>stripeInit}
         />        
        )

})
}
            {/* <Card
            // title={template.card1Title} use for a STORE- for donations, amt is sufficient
            title={template.card1Title}
            description={template.card1Text}
            price={template.card1Price}
            stripeInit = {()=>stripeInit}
            /> */}
            
            {/* <Card
            title={template.card2Title}
            description={template.card2Text}
            price={template.card2Price}
            stripeInit = {()=>stripeInit}
            /> */}
           
            {/* <Card
            title={template.card3Title}
            description={template.card3Text}
            price={template.card3Price}
            stripeInit = {()=>stripeInit}
            /> */}
            
            {/* <Card
            title={template.card4Title}
            description={template.card4Text}
            price={template.card4Price}
            stripeInit = {()=>stripeInit}
            /> */}
           
            </div>
            
        </div>
        </div>
        <Footer
        footerText={template.footerText}
        footerSubtext={template.footerSubtext}
        footerColor={template.footerColor}
        />
        </div>
    )
}

export default Donate;