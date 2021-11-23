import React from "react";
import {useContext, useState,useEffect} from "react"
function Header(props) {
    return (
      <div className="">
        <header className="centered br-gradient-aqua">
          <p className="header-text white">{props.orgName}</p>
        </header>
      </div>
    );
  }
  
  export default Header;