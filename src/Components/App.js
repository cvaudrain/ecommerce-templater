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
// default Template
// import defaultTemplate from '../reuse/defaultTemplate';
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
// import defaultTemplate from '../reuse/defaultTemplate';
// export function addScript(url){ //use function to append a script tag for any external js files passing in the url as arg- called at bottom of page inside {} 
//  console.log(url)
//   const script = document.createElement("script")
//   script.src = "../reuse/defaultTemplate"
//   script.async = true;
//   document.body.appendChild(script)
//   }

function App() {
 const defaultTemplate = { 
   howMany:0,
  currentTemplate:true,
  customCard:"",
  card1Price:null,
      card2Price:0,
      card3Price:0,
      card4Price:0,
      card1Title:"",
      card2Title:"",
      card3Title:"",
      card4Title:"",
      card1Text:"loading",
      card2Text:"loading",
      card3Text:"",
      card4Text:"",
      card5Price:0,
      card6Price:0,
      card7Price:0,
      card8Price:0,
      card5Title:"",
      card6Title:"",
      card7Title:"",
      card8Title:"",
      card1Text:"",
      card2Text:"",
      card3Text:"",
      card4Text:"",
      card5Text:"",
      card6Text:"",
      card7Text:"",
      card8Text:"",
      headerColor:"",
      footerColor:"",
      cardColor:"",
      cardButtonColor:"",
      backgroundImage:{
          contentType:"",
          imgSrc:""
          },
      logo: {
          contentType:"",
          imgSrc:""
          }}
          // roles: admin, guest
const [userRole,setUserRole] = useState("admin")
  // const [donateState,setDonateState] = useState(defaultTemplate) //will receive via raised state from <Donate />
const [template,setTemplate] = useState(defaultTemplate)
  function setRaisedState(raisedState){ //tied to prop function, receives and sets raised state
// setDonateState(raisedState)
setTemplate(raisedState) //these 2 states are redundant- but won't be if we differentiate between different page states with more involved editor.

  }
  function setTemplateGlobal(){ //called once on init load, and when admin-editor templater raises up the global set template call
    axios.get("/api/loadDonateTemplate").then((res)=>{
      console.log("DATA")
      console.log(res.data)
      setTemplate(res.data)
  }).catch((err)=>console.log(err))
  }
  
  // Change global tenmplate to match current version in DB, passed down to all children who inherit with globalTemplate 
  useEffect(()=>{
    setTemplateGlobal()
  },[])
  // useEffect(()=>{
  //   console.log(template)

  // },[template])

  // for Join page
  const navObj = {
    admin:{
nav1:"/admin",
nav1Text:"Admin-Home",
        nav2:"/",
        nav2Text:"Homepage",
        nav3:"/join",
        nav3Text:"Public Recruitment Page"
    },
    public: {
      nav1:"/",
      nav1Text:"Donate",
        nav2:"",
        nav2Text:"",
        nav3:"",
        nave3Test:""
    }
}

  return (
    <div className="">
    <Header
  orgName={userRole === "admin" ? "QVRR  Fundraiser Admin Portal" : template.orgName}
         logoImgSrc={template.logo.imgSrc}
         logoContentType={template.logo.contentType}
         subheading={userRole === "admin" ? "" : template.headerText}
         nav1Text={userRole === "admin" ? navObj.admin.nav1Text : navObj.public.nav1Text}
         nav1={userRole === "admin" ? navObj.admin.nav1 : navObj.public.nav1}
         nav2Text={userRole === "admin" ? navObj.admin.nav2Text : navObj.public.nav2text}
         nav2={userRole === "admin" ? navObj.admin.nav2 : navObj.public.nav2}
         nav3Text={userRole === "admin" ? navObj.admin.nav3Text : navObj.public.nav3text}
         nav3={userRole === "admin" ? navObj.admin.nav3 : navObj.public.nav3}
         headerColor={template.headerColor}
/>
      <Routes>
{/* Public App */}
{/* <Route path="/" element={<Layout/>} />  */}
<Route path = "/" element={<Header/>} 
  globalTemplate = {template}
/>
<Route index element = {<Donate
  raiseTemplateState = {setRaisedState}
  globalTemplate = {template}
/>} /> 
<Route path="campaign" element={<Donate
  raiseTemplateState = {setRaisedState}
  globalTemplate = {template}
/>} />  
<Route path="join" element={<Join
 inheritedTemplate={template}
 globalTemplate={template}

/>} />  
<Route path="success" element={<DonateSuccess
  inheritedTemplate={template}
  globalTemplate={template}
/>}/>
{/* Admin App */}

<Route path = "/admin" element={<AdminApp/>} 
  globalTemplate = {template}
  
/>
<Route path= "/admin-editor" element={<AdminEditor/>}
getTemplateGlobal = {setTemplateGlobal} />
<Route path= "/admin-view-apps" element={<AdminViewApps/>}
globalTemplate = {template} />
<Route path= "/admin-approval" element={<AdminApproval/>}
globalTemplate = {template} />


      </Routes>
      <Footer
        footerText={template.footerText}
        footerSubtext={template.footerSubtext}
        footerColor={template.footerColor}
        />
    
    </div>
  );
}

export default App;


