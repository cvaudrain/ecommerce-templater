import {useContext, useState,useEffect} from "react"
import { Switch, Route, Link, Redirect,useLocation,Outlet, useHistory } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"

// Middleware
import axios from "axios"

export default function AdminApp(props){
const user = {
  name:"Chris",
  id:1,
  email:"cvaudrain@gmail.com"
}
const [info, setInfo] = useState({
  editor:false,
  adminAppViewer:false,
  memberAppViewer:false
})
useEffect(()=>{
  console.log(info)
},[info])
function handleInfo(ev){
  let keyName=ev.target.id
    setInfo(prev=>{
    return {...prev,
    [keyName]:true
    }
  })
}
// Change to a parent-inherited prop value...
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

function resetInfo(ev){
  console.log(ev)
  setInfo({
    editor:false,
    adminAppViewer:false,
    memberAppViewer:false
  })
}
return(
    <div className="cloud-gradient" onClick={resetInfo} >
<Header
logo={"images/logo.png"}
orgName={"QVRR Admin Portal"} 
subheading={`Hello, ${user.name}.`}
adminView={true}
nav1Text={navObj.admin.nav1Text}
nav1={navObj.admin.nav1}
nav2Text={navObj.admin.nav2Text}
nav2={navObj.admin.nav2}
/>
<div className="md-text pad-sm outfit-font centered ">
  <p>What would you like to do?</p>
</div>
<div className="container ">

<div className="row">
{info.memberAppViewer===true ?
<div onMouseOut={resetInfo} className="content-card  black fixed align-l padding-sm br-translucent help ab-l">
  <p className="black bold">Here you can view new club member applications <br/>submitted by prospective members.</p>
</div>
:
null
}
  <div name="1"  className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 content-card theGoodShading padding-sm black-gradient">
  <i onMouseOver={handleInfo} onMouseOut={resetInfo} id="memberAppViewer"  class="far padding-sm fa-question-circle white "></i>
  <p className="md-text">View Member Applications </p>
  <a href="/admin-view-apps"><button className="pill green-gradient theGoodShading padding-sm">View</button></a>
  </div>
  {info.editor===true ?
<div  className="content-card  black fixed align-r padding-sm br-translucent help ab-r">
  <p className="black bold">Here you can edit content for <br/>the public page that visitors interact with. </p>
</div>
:
null
}
  <div name="2"  className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 content-card theGoodShading padding-sm black-gradient">
  <i onMouseOver={handleInfo} onMouseOut={resetInfo} id="editor"  class="far padding-sm fa-question-circle white "></i>
  <p className="md-text">Edit Fundraiser Page Content</p>
  <a href="/admin-editor"><button className="pill green-gradient theGoodShading padding-sm">Edit</button> </a>
  </div>
</div>
<div className="row top-space">
{info.adminAppViewer===true ?
<div  className="content-card  black fixed align-l padding-sm br-translucent help ab-lc ">
  <p className="black bold">Here you can review/approve admin access requests <br/>submitted by other club members.</p>
</div>
:
null
}
  <div name="3" className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 content-card theGoodShading padding-sm black-gradient">
  <i onMouseOver={handleInfo} onMouseOut={resetInfo} id="adminAppViewer"  class="far padding-sm fa-question-circle white "></i>
  <p className="md-text">View Admin Applications </p>
  <a href="/admin-approval"> <button className="pill green-gradient theGoodShading padding-sm">View</button></a>
  </div>
  </div>
</div>
<Footer />
</div>
)
}