import React from "react";
import {useContext, useState,useEffect} from "react"
function Header(props) {
    return (
    
      <div className={props.headerColor + " theGoodShading"} >
        <div className="padding-sm ">
      <div className="centered ">
        
           <img className="logo-format-round padding-sm inset" src={ `data:image/${props.logoContentType};base64,${props.logoImgSrc}` }></img>
          {/* <div className="col-xl-2 col-lg-2 col-sm-12 col-xs-12">  </div> */}
           <p className="header-text outfit-font padding text-shadow bold">{props.orgName}</p>
           <p className="header-text italic padding-sm text-shadow ">{props.subheading}</p>
           <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
        <div class="">
        <nav class="navbar navbar-expand-lg br-transparent ">

  <div class=" navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link white" href={props.nav1}><p className="md-text">{props.nav1Text}</p> <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link white" href={props.nav2}><p className="md-text">{props.nav2Text}</p></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link white" href={props.nav3}><p className="md-text">{props.nav3Text}</p> <span class="sr-only">(current)</span></a>
      </li>
    </ul>
    
  </div>
</nav>
        </div>
       
        
      </div>
   
        {/* <div className="centered ">
          
          <p className="header-text white">{props.orgName}</p>
        </div> */}
      </div>
      </div>
    );
  }
  
  export default Header;