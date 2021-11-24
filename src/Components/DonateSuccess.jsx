import Header from "./Header"
import Footer from "./Footer"
import { useState } from "react"
export default function DonateSuccess(props){
    const [inheritedTemplate,setInheritedTemplate] = useState(props.inheritedTemplate)
    return(
        <div className="cloud-gradient">
        <Header
         orgName={inheritedTemplate.orgName || "Loading"}
         logo={inheritedTemplate.logo || "Loading"}
        />
        <div className=" pad-b-sm">
        <div className="content-card peach-gradient theGoodShading">
            <h2 className="">Success!</h2>
            <p className="header dark-gray">Thanks for registering! If you haven't submitted your team roster  please be sure to do so before the event.</p>
        <h4 className=" magenta">See you there!</h4>
        <a href="/"><button className="save-btn br-gradient-aqua centered"><i className="fas fa-2x fa-home "></i></button></a>
        </div>
        </div>
        <Footer
        footerText={inheritedTemplate.footerText || "Loading"}
        footerSubtext={inheritedTemplate.footerSubtext || "Loading"}

        />
        </div>
    )
}