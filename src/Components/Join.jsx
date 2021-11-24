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
  return (
    <div className="br-logo pad-b-xl">
        <Header
         orgName={inheritedTemplate.orgName || "Loading"}
         logo={inheritedTemplate.logo || "Loading"}
        />
        <div className=" pad-b-xl">
       
           <form className="app-form container pad-b">
          
           
        <div class="row">
           <div class="col">
        <input  type="text" id="name" name="name" placeholder="name"></input>
        </div>
        <div class="col">
        <input  type="text" id="DOB" name="DOB" placeholder="DOB"></input>
        </div>
        <div class="col">
        <input type="text"  id="Address" name="Address" placeholder="Address"></input>
        </div>
        </div>

        <div class="row">
           <div class="col">
        <input  type="text" id="Phone" name="Phone" placeholder="Phone Number"></input>
        </div>
        <div class="col">
        <input  type="text" id="Employer" name="Employer" placeholder="Employer"></input>
        </div>
        <div class="col">
        <input  type="text" id="Employer Address" name="Employer Address" placeholder="Employer Address"></input>
        </div>
        </div>
        <div class="row top-space">
           
        <div class="col">
        <p>{applicationTemplate.questions.a}</p>
        <input type="radio" id="participation" name="participation" ></input>
        <label for="participation" >Yes</label><br></br>
        </div> 
        <div class="col">
        <p>Are you willing to pay member dues of $ {applicationTemplate.duesAmount} per year?</p>
        <input type="radio" id="canPayDues"  name="canPayDues" ></input>
        <label for="canPayDues" >Yes</label><br></br>
        </div>
        <div class="col">
        <p>{applicationTemplate.questions.c}</p>
        <input type="radio" id="canJoinComm" ></input>
        <label for="canJoinComm" >Yes</label><br></br>
        </div>
        </div>

        <div class="row top-space">
           <div class="col">
        <input  type="text" id="rotarian" name="rotarian" placeholder="Y/N"></input>
        <label for="rotarian" >{applicationTemplate.d}</label><br></br>
        </div>
        <div class="col">
        <input  type="text" id="about" name="about"  placeholder="A bit about yourself!"></input>
        <label for="about">{applicationTemplate.h}</label><br></br>
        </div>
        
        </div>

        <div class="row top-space">
        <div class="col">
        <input  type="text" id="signature" name="signature" placeholder="Digital Signature"></input>
        <label for="signature" >Your Digital Signature</label><br></br>
        </div>
        <div className="col">
        <input  type="date" id="date" name="date" placeholder="Today's Date"></input>
        <label for="date" >Today's Date</label><br></br>
        </div>
        </div>
       
           </form>
      
        </div>
        <Footer
        footerText={inheritedTemplate.footerText || "Loading"}
        footerSubtext={inheritedTemplate.footerSubtext || "Loading"}

        />
        </div>
  );
}

export default Join;