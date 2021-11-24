import React from "react";
import {useContext, useState,useEffect} from "react"
function Header(props) {
    return (
      <div className="br-gradient-aqua padding-sm ">
      <div className="centered ">
        
           <img className="logo-format-round padding-sm inset" src={props.logo}></img>
          {/* <div className="col-xl-2 col-lg-2 col-sm-12 col-xs-12">  </div> */}
           <p className="header-text outfit-font white padding text-shadow bold">{props.orgName}</p>
        <div class="">
        <nav class="navbar navbar-expand-lg br-transparent ">
  {/* <a class="navbar-brand white" href="#"><i class="fas fa-bars"></i></a>
  <button class="navbar-toggler white" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon white"></span>
  </button> */}

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link white" href="/">Donate <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link white" href="/join">Join</a>
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
    );
  }
  
  export default Header;