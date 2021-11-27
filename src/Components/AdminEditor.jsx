import {useContext, useState,useEffect} from "react"
import { Switch, Route, Link, Redirect,useLocation,Outlet, useHistory } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"
import AdminCardForm from "./AdminCardForm";
import Card from "./Card"
// Middleware
import axios from "axios"

export default function AdminEditor(props){
const user = {
  name:"Chris",
  id:1,
  email:"cvaudrain@gmail.com"
}
let temp = {
    Logo: "image.png",
card1Rendered: true,
card1Text: "Small donation",
card1Title: "Bronze",
card2Rendered: true,
card2Text: "med Donation",
card2Title: "SIlver",
card2price: "5",
card3Rendered: true,
card3Text: "Large Dono",
card3Title: "Gold",
card3price: "20",
card4Rendered: true,
card4Text: "Special Donation",
card4Title: "Platinum",
card4price: "50",
footerSubtext: "Subtext: A good cause",
footerText: "Footer For Fundraiser",
headerText: "A good Fundraiser",
orgName: "Fundraiser",
isRendered:{
card1:"",
card2:"",
card3:"",
card4:"",
card5:"",
card6:"",
card7:"",
card8:""
},
howMany:""
}


const [donateTemplate, setDonateTemplate] = useState({
    howMany:0,
    card1Price:null,
        card2Price:0,
        card3Price:0,
        card4Price:0,
        card1Title:"",
        card2Title:"",
        card3Title:"",
        card4Title:"",
        card1Text:"",
        card2Text:"",
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
        card8Text:""

})
const [cardNum,setCardNum] = useState(4)
const [joinTemplate, setJoinTemplate] = useState({})
const [preview,setPreview] = useState(false)

function showPreview(e){
    e.preventDefault()
    if(donateTemplate.card1Price == null || donateTemplate.orgName == "" || donateTemplate.footerText == "") {
        console.log("Please complete header/footer and at least 1 card")
        return
    } //no showPreview unless at least 1 card is completed
    setPreview(true)
}
let howManyArray = []

// This for loop will set an array to whatever length equals the number of howMany selected,
//thereby allowing us to use an expression of map() function to render correct amount, since we cannot use 
//a for loop inside JSX
for(var i=0;i<donateTemplate.howMany;i++){
    howManyArray.push({
        title:"",
        card:"",
        price:""
    })
}
function handleForm(ev){
    let name = ev.target.id
    let value = ev.target.value
    setDonateTemplate(prev=>{
        return {
            ...prev,
            [name] : value
        }
    })
console.log(donateTemplate)
}
function submitEdits(ev){
    ev.preventDefault()
    console.log(donateTemplate)
    axios.post("/api/editDonateTemplate",donateTemplate)
    .then((res)=>console.log(res.data))
}
return(
    <div className="cloud-gradient">
<Header
logo={"images/logo.png"}
orgName={"Edit Fundraiser Page Content"} 
subheading={`Hello, ${user.name}.`}
adminView={true}
/>
<div className="md-text pad-sm outfit-font centered ">
  <form className="templating-form theGoodShading">
  {/* Header Content */}
  <div className="container">
<div classname="centered">
<p className="header-text white">Fundraiser Page Content</p>
<input onChange={handleForm} id="orgName" type="text" placeholder="Page Header" />
    <input onChange={handleForm} id="headerText" type="text" placeholder="Subheading" />
    <input onChange={handleForm} id="Logo" type="" placeholder="Logo" />
    <input onChange={handleForm} id="howMany" name="howMany" type="number" placeholder="Number of donation cards?"/>
    {/* <label for="howManyArray">How many cards should appear?</label> */}
</div>

{/* Main Content */}
{howManyArray.map((n,i)=>{
return <AdminCardForm
cardNum = {i+1}
handleForm={handleForm}

/>

})
}

{/* Footer Content */}
<div className="top-space-sm template-section"></div>
<div classname="centered">
    <input onChange={handleForm} name="footerText" id="footerText" type="" placeholder="main footer text" />
    <input onChange={handleForm} name="" id="footerSubtext" type="" placeholder="footer subtext" />
    <input onChange={handleForm} type="color" id="headerColor" name="headerColor"  />
    <label for="headerColor">Header Color</label>
    <input onChange={handleForm} type="color" id="footerColor" name="headerColor" />
    <label for="headerColor">Footer Color</label>
</div>
</div>
<button onClick={showPreview} className="bottom-space top-space save-btn-templater green-gradient "><p className="sm-text ">Preview</p></button>
  </form>
  
</div>
{/* BEGIN PREVIEW */}
{preview &&
//if preview mode activated, show preview. Will not show if no cards are completed.
<div id = "editorPreview" className="margin-all preview-border">
<Header
         orgName={donateTemplate.orgName}
         logo={donateTemplate.logo}
         subheading={""}
        />
 <div className="row">
{howManyArray.map((n,i)=>{ 
   //
return (
    
<Card
title={ eval(`donateTemplate.card${i+1}Title`)}
description={eval(`donateTemplate.card${i+1}Text`)}
price={"$" +eval(`donateTemplate.card${i+1}Price`)}
// style={eval(`donateTemplate.card${i+1}Price`) ==null && {style={display:"none"}} }
// stripeInit /= {()=>stripeInit}
            />
           
)

})
}
</div>


<Footer
        footerText={donateTemplate.footerText}
        footerSubtext={donateTemplate.footerSubtext}

        />
        <div className="centered content-card-xl">
        <p className="md-text">Do you want to finalize these edits?</p>
<div classname="infoMessage">
        <p className="md-text">Warning: Once you submit, changes will take effect on the live site. You can change them again at any time.<br/></p>
</div>
<button onClick={submitEdits} className="save-btn green-gradient" >Yes</button>
</div>
</div>
}
{/* END PREVIEW */}
<Footer />
</div>
)
}