

import Card from "./Card" 
import Join from "./Join" 
import Donate from "./Donate" 
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useHistory,
    Outlet
  } from "react-router-dom";

function PublicApp() {
    return (
      <div className="App">
        <div className="content-card centered">
          <div>PUBLIC APP</div>
          <Outlet />
        </div>
      </div>
    );
  }
  
  export default PublicApp;