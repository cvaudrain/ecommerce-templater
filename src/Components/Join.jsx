// Style
import '../App.css';
// React / Router
import React from "react"
import {useContext, useState,useEffect} from "react"
import { Switch, Route, Link, Redirect,useLocation,Outlet, useHistory } from "react-router-dom";
// Middleware
import axios from 'axios';
// Stripe?
// Components
import Header from "./Header" 
import Footer from "./Footer" 


function Join(props) {
    const [inheritedTemplate,setInheritedTemplate] = useState(props.inheritedTemplate)
    const [applicationTemplate,setApplicationTemplate] = useState({
        title:"",
        duesAmount:25,
        questions :{
            a:"Are you able to take part in 60% of the club's meetings and activities?",
            b:"",
            c:"Are you interested in joining a committee?",
            d:"The Rotary Foundation offers opportunities to Rotaractors (who are not children or grandchildren of Rotarians) for study and travel abroad.  Please indicate if you are a child or grandchild of a Rotarian",
            e:"",
            f:"",
            g:"I understand and accept the principles of Rotaract as expressed in its purpose and objectives and agree to comply with and bebound by the “Standard Rotaract Club Constitution,” “Rotaract Statement of Policy,” and by-laws of the club.  Further, I acknowledge that dues are non-refundable",
            h:"Do you have any hobbies, interests or other accomplishments you'd like to share?",
            k:"",
            m:"",
            n:"",
            o:"",
            p:""
        }
    })

    let submitForm = ()=>{
       console.log("click button")
    }

    const navObj = {
      admin:{
  nav1:"/admin",
  nav1Text:"Admin-Home",
          nav2:"/",
          nav2Text:"Homepage"
      },
      public: {
        nav1:"/",
        nav1Text:"Donate",
          nav2:"",
          nav2Text:""
      }
  }
  return (
    <div className="br-logo pad-b-xl">
        <Header
         orgName={inheritedTemplate.orgName || "Loading"}
         logo={inheritedTemplate.logo || "Loading"}
         nav1Text={navObj.public.nav1Text}
nav1={navObj.public.nav1}
nav2Text={navObj.public.nav2Text}
nav2={navObj.public.nav2}
        />
        <div className=" pad-b-xl">
       
           <form className="app-form container pad-b br-white">
          
           
        <div class="row">
           <div class="col">
        <input  type="text" id="name" name="name" placeholder="Name"/>
        </div>
        <div class="col">
        <input  type="text" id="DOB" name="DOB" placeholder="DOB"/>
        </div>
        <div class="col">
        <input type="text"  id="Address" name="Address" placeholder="Address"/>
        </div>
        </div>

        <div class="row">
           <div class="col">
        <input  type="text" id="Phone" name="Phone" placeholder="Phone Number"/>
        </div>
        <div class="col">
        <input  type="text" id="Employer" name="Employer" placeholder="Employer"/>
        </div>
        <div class="col">
        <input  type="text" id="Employer Address" name="Employer Address" placeholder="Employer Address"/>
        </div>
        </div>
        <div class="row top-space">
           
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <p>{applicationTemplate.questions.a}</p>
        <div className="row">
       <div className="col-6">
        <input type="radio" id="participation" name="participation" value={true}/>
        <label for="participation" >Yes</label><br></br>
        </div>
        <div className="col-6">
        <input type="radio" id="participation" name="participation" value={false} />
        <label for="participation" >No</label><br></br>
        </div>
        </div> 
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <p>Are you willing to pay member dues of $ {applicationTemplate.duesAmount} per year?</p>
        <div className="row">
       <div className="col-6">
        <input type="radio" id="canPayDues"  name="canPayDues" value={true}/>
        <label for="canPayDues" >Yes</label><br></br>
        </div>
        <div className="col-6">
        <input type="radio" id="canPayDues"  name="canPayDues" value={false} />
        <label for="canPayDues" >No</label><br></br>
        </div>
        </div>
       </div>

      
       <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
       <p>{applicationTemplate.questions.c}</p>
       <div className="row">
       <div className="col-6">
        <input type="radio" id="canJoinComm" value={true}/>
        <label for="canJoinComm" >Yes</label><br></br>
       </div>
       <div className="col-6">
        <input type="radio" id="canJoinComm" value={false} />
        <label for="canJoinComm" >No</label><br></br>
        </div>
     </div>
        </div>
     
       
        </div>

        <div class="row top-space">
           <div class="col">
        <input  type="text" id="rotarian" name="rotarian" placeholder="Y/N"/>
        <label for="rotarian" >The Rotary Foundation offers opportunities to Rotaractors (who are not children or grandchildren of Rotarians) for study and travel abroad.  Please indicate if you are a child or grandchild of a Rotarian.</label><br></br>
        </div>
        <div class="col">
        <input  type="text" id="about" name="about"  placeholder="A bit about yourself!"/>
        <label for="about">Do you have any hobbies, interests or other accomplishments you'd like to share?</label><br></br>
        </div>
        
        </div>

        <div class="row top-space">
        <div class="col">
        <input  type="text" id="signature" name="signature" placeholder="Digital Signature"/>
        <label for="signature" >Your Digital Signature</label><br></br>
        </div>
        <div className="col">
        <input  type="date" id="date" name="date" placeholder="Today's Date"/>
        <label for="date" >Today's Date</label><br></br>
        </div>
        </div>
       <button onClick={submitForm} className="save-btn-templater">Submit</button>
           </form>
      
        </div>
        {/* <Footer
        footerText={inheritedTemplate.footerText || "Loading"}
        footerSubtext={inheritedTemplate.footerSubtext || "Loading"}

        /> */}
        </div>
  );
}

export default Join;