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

const [donateTemplate, setDonateTemplate] = useState({
    howMany:0,
    currentTemplate:true,
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
        card8Text:"",
        headerColor:"",
        footerColor:"",
        cardColor:"",
        cardButtonColor:"",
        backgroundImage:"", //needs format of contentType:req.file.mimetype, image:data:"", contentType:"image"
        logo:""

})  
//Statefuls
const [cardNum,setCardNum] = useState(4)
const [joinTemplate, setJoinTemplate] = useState({})
const [preview,setPreview] = useState(false)
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
const [messageUi, setMessageUi] = useState({
    confirm:"Do you want to finalize these edits?",
    alert:"Warning: Once you submit, changes will take effect on the live site. "
})
const [selectedColor,setSelectedColor] = useState({
    headerColor:donateTemplate.headerColor,
    footerColor:donateTemplate.footerColor,
    cardColor:donateTemplate.cardColor,
    cardButtonColor:donateTemplate.cardButtonColor
})
// UseEffect GET Req to load current template (i.e avoid starting with blank form) ONCE per page load/refresh
useEffect(()=>{
    console.log("loading current template, populating form...")
axios.get("/api/loadDonateTemplate")
.then((res)=>{
    console.log(res.data)
        setDonateTemplate(res.data)
})
.catch((err)=>console.log(err))
},[])
useEffect(()=>{
    console.log("donateTemplate Changed")
    setSelectedColor({
        headerColor:donateTemplate.headerColor,
        footerColor:donateTemplate.footerColor,
        cardColor:donateTemplate.cardColor,
    cardButtonColor:donateTemplate.cardButtonColor
    })
},[donateTemplate])

// Functions, UI Events, Handlers
function handleForm(ev){
    console.log(ev)
    let name = ev.target.id
    let value = ev.target.value
    // console.log(ev.target.props.value)
    if(name=="headerColor" || name=="footerColor" || name=="cardColor" || name=="cardButtonColor") {value=ev.target.innerText +"-gradient"} //bc value is not valid for p elements, must instead target innerText attribute, + "-gradient" to equal className
    console.log(`Target = ${ev.target.id}`)
  
    console.log(name)
    console.log(value)
    setDonateTemplate(prev=>{
        return {
            ...prev,
            [name] : value
        }
    })
console.log(donateTemplate)
}

// Render Preview
function showPreview(e){
    e.preventDefault()
    if(donateTemplate.card1Price == null || donateTemplate.orgName == "" || donateTemplate.footerText == "") {
        console.log("Please complete header/footer and at least 1 card")
        return
    } //no showPreview unless at least 1 card is completed
    setPreview(true)
}
// Submit via api to update DB
function submitEdits(ev){
    ev.preventDefault()
  
    console.log(donateTemplate)
    axios.post("/api/editDonateTemplate",donateTemplate)
    // axios({
    //     method:"post",
    //     url:"/api/editDonateTemplate",
    //     data: donateTemplate,
    //     headers:{
    //         "content-type":"multipart/form-data"
    //     }
    // })
    .then((res)=>{
    console.log(res.data.message)
    console.log(res.data.newTemplate)
    setMessageUi({
        confirm:"",
        alert:"Success! Your template is live, and you can return here any time to make edits"
    })
})
.catch((err)=>{
    console.log(err)
    setMessageUi(prev=>{
        return {
            ...prev,
            alert: "Hm, something went wrong. Let's try again. If the problem persists, check your network connection and contact support."
        }
    })
}) //if server responds with res.sattus and not a res.json object
}
const [file,setFile] = useState({})
const [fileName,setFileName] = useState("")
console.log(file)
function handleImage(ev){
    console.log("FILES")
    // console.log(ev.target.elements.input.files)
    // let name = ev.target.id
    // let value = ev.target.files[0]
    // console.log("PATH")
    let selectedFile = ev.target.files[0]
    setFile(selectedFile)
    setFileName("logo")
    // console.log(ev.target.files[0].path )//targets 1st file image
    console.log(ev.target.id) //targets logo

    // console.log(ev.target.files) //targets the file objects array
    // setFile({
    //     fieldname: selectedFile.id, //the id and name attr of the INPUT element with type=image
    //     originalname: selectedFile.name, //NOT the name attr of the input, but the ev.target/files[0].name, which is the file name like pokemon.jpg etc
    //     // encoding: '', //will set on server BASED ON ENCTYPE?
    //     mimetype: selectedFile.type, //
    //     // destination: 'uploads', //will be set on server
    //     // filename: 'logo-1638214876626',
    //     path: '', //needs to be set from formSubmit event, not input as target
    //     size: selectedFile.size
    // })
}


//Format of req.file on server:
// 
// {
    // fieldname: 'logo',
    // originalname: 'starters.jpg',
    // encoding: '7bit',
    // mimetype: 'image/jpeg',
    // destination: 'uploads',
    // filename: 'logo-1638214876626',
    // path: 'uploads\\logo-1638214876626',
    // size: 214439
//   }
/* So we need to reformat a couple file property names bc Multer uses vanilla attr values, but JSX names certain keys differently.
 The file in JSX has .name and .type, But the server will expect .fieldname and .mimetype for example */

 function handleImageSubmit(ev){
    //  ev.preventDefault();
    // console.log(file)
    // console.log(fileName)
    let data = new FormData()
// Client
data.append("name","logo")
data.append("logo",file)

console.log("FILE")
console.log(file)
const config = {
    headers: {
        "content-type": "multipart/form-data"
    }
}
axios.post("/api/uploadimage",data)
.then((res)=>{console.log(res)})
.catch((err)=>console.log(err))
    // ev.preventDefault()
}
// function handleImageSubmit(ev){
//     let formData = new FormData()
// formData.append("file",file)
// const config = {
//     headers: {
//         "content-type": "multipart/form-data"
//     }
// }
// // axios.post("/api/uploadimage",formData,config)
//     ev.preventDefault()
//     console.log("FILE")
//     console.log(ev.target.elements.logo.name) 
//     let inputName = ev.target.elements.logo.name
//     console.log(inputName)
//     // console.log(ev.target.elements.logo.header)
//     console.log(ev.target.elements.logo.files) //returns FileList, an array of file objects
//     console.log(ev.target.elements.logo.files[0]) //returns the file object itself, just like we captured in the onChange
//    console.log(ev.target.elements.logo.value) //the path of the image
// let selectedFile = ev.target.elements.logo.files[0]

// let filePath = ev.target.elements.logo.value //the path, needed for payload
// formData.append("fieldname",inputName)
// formData.append("originalname",selectedFile.name)
// formData.append("mimetype",selectedFile.type)
// formData.append("size",selectedFile.size)
// let formatFile = {
//     fieldname: inputName, //the id and name attr of the INPUT element with type=image
//     originalname: selectedFile.name, //NOT the name attr of the input, but the ev.target/files[0].name, which is the file name like pokemon.jpg etc
//     // encoding: '', //will set on server BASED ON ENCTYPE?
//     mimetype: selectedFile.type, //
//     // destination: 'uploads', //will be set on server
//     // filename: 'logo-1638214876626', //set on server
//     // path:`uploads\\${inputName}` , //the path used by Multer is defined in the muilter storage object, made with the uploads fdirname + fieldname + date.now() for a long unique string
//     //So, we'll match the format here.
//     size: selectedFile.size
// }
// //    let fileWithPath = file //clone non state variable
//     // file.path = ev.target.elements.logo.value //must get path from form event, not input handle event. NOW file contains path for multer 
//     // file.encoding = ev.target
//     console.log(formatFile)
//     // return
   
//     }
//     const formData = new FormData()
    // let fileWithPath = file //clone non state variable
    // file.path = ev.target.elements.logo.value //must get path from form event, not input handle event. NOW file contains path for multer 
// console.log("File:")
//     console.log(formatFile)
    //     // formData.append("name","logo")
//     formData.append("file",file,"logo")
//     console.log(formData) //undefined? it isn't loggable that's just how it is.
    // formData.append("name","logo")
    // console.log(ev.target.files[0])
    // console.log(ev.target.elements.logo.value) //the path of the image
 
    // const payload = {
    //     image: {
    //         da
    //     }
    // }
    // formData.append("title",this.state.title)
    // formData.append("file",this.state.file)    
    // console.log(formData)
    // axios.post("/api/uploadimage",formData,config)
    
    // axios.post("/api/uploadimage",formatFile)
// }

return(
    <div className="br-logo-gray">
<Header
logo={"images/logo.png"}
orgName={"Edit Public Page Content"} 
subheading={donateTemplate.subheading}
adminView={true}
nav1Text={navObj.admin.nav1Text}
nav1={navObj.admin.nav1}
nav2Text={navObj.admin.nav2Text}
nav2={navObj.admin.nav2}
headerColor={"indigo-gradient"}
/>
{/* Form (to input edits to template object / stateful object donateTemplate) */}
<div className="md-text pad-sm outfit-font centered ">

<form className="br-white black theGoodShading" action="/api/uploadimage" method="POST" enctype="multipart/form-data">
<input onChange={handleImage} className="black-border-sm theGoodShading" id="logo" name="logo" type="file" accept="image/*" />
{/* <input type="text" id="name" onChange={event=>{
    setFileName(event.target.value)}}/> */}
</form>
<button onClick={handleImageSubmit}>send</button>
  <form className="br-white black theGoodShading" >
  {/* Header Content */}
  <div className="container">
<div classname="centered">
<p className="header-text black"> Page Content</p>
<input className="black-border-sm theGoodShading" onChange={handleForm} id="orgName" type="text" placeholder="Page Header" value={donateTemplate.orgName} />
    <input className="black-border-sm theGoodShading" onChange={handleForm} id="headerText" type="text" placeholder="Subheading" value={donateTemplate.headerText} />
    {/* <input className="black-border-sm theGoodShading" onChange={handleFormImage} id="logo" type="file" accepts="image/*" placeholder="Logo" value={donateTemplate.logo} /> */}
    <input className="black-border-sm theGoodShading" onChange={handleForm} id="howMany" name="howMany" type="number" min="0" max="8" placeholder="Number of donation cards?" value={donateTemplate.howMany}/>
    {/* <label for="howManyArray">How many cards should appear?</label> */}
</div>

{/* Main Content */}
{howManyArray.map((n,i)=>{
return <AdminCardForm
cardNum = {i+1}
handleForm={handleForm}
initTitleValue={eval(`donateTemplate.card${i+1}Title`)}
initTextValue={eval(`donateTemplate.card${i+1}Text`)}
initPriceValue={eval(`donateTemplate.card${i+1}Price`)}
/>

})
}
<hr/>
{/* Footer Content */}
<div className="top-space-sm template-section">
</div>
<hr/>
<div classname="centered">
    <input className="black-border-sm theGoodShading" onChange={handleForm} name="footerText" id="footerText" type="" placeholder="main footer text" value={donateTemplate.footerText} />
    <input className="black-border-sm theGoodShading" onChange={handleForm} name="" id="footerSubtext" type="" placeholder="footer subtext" value={donateTemplate.footerSubtext} />
    
</div>
<div className="top-space-sm template-section container pad-b-sm soft-corners">
<hr/><hr/>
<div className="centered">
<p className="md-text italic bold">Visuals & Theme</p>



<p className="italic">Background Image</p>
<div className="center-div bottom-space-sm">
<input onChange={handleForm} className="black-border-sm theGoodShading" class="centered sm-text" type="file" accept="image/*" id="backgroundImage" name="backgroundImage" placeholder="Image File" value={donateTemplate.backgroundImage} />
</div>
</div>
<hr/>
<p className="italic">Header Color</p><br/>
<p className="bottom-space-xs">Current: </p> 
<div style={{height:"35px",width:"55px",borderRadius:"7px", marginBottom:"20px"}} className={selectedColor.headerColor+" "+"center-div theGoodShading "}></div>
 {/* <input class="centered" type="text" id="name" name="name" placeholder="img name"  /> */}
 <div className="row"> 
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="peach-gradient theGoodShading color-swatch"><p onClick={handleForm} id="headerColor" className="sm-text white">peach</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div onClick={handleForm} id="headerColor" value="aqua-gradient" className="aqua-gradient theGoodShading color-swatch"><p onClick={handleForm} id="headerColor" className="white sm-text">aqua</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div  className="indigo-gradient theGoodShading color-swatch"><p onClick={handleForm} id="headerColor"  className="white sm-text">indigo</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div  className="magenta-gradient theGoodShading color-swatch"><p onClick={handleForm} id="headerColor" m className="white sm-text">magenta</p></div>

</div>
</div>
 <div className="row">     
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className=" forest-gradient theGoodShading color-swatch"><p onClick={handleForm} id="headerColor" className="white sm-text">forest</p></div>
</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div  className=" periwinkle-gradient theGoodShading color-swatch"><p onClick={handleForm} id="headerColor" myco className="white sm-text">periwinkle</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="chrome-gradient theGoodShading color-swatch"><p onClick={handleForm} id="headerColor" className="white sm-text">chrome</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="cloud-gradient theGoodShading color-swatch"><p onClick={handleForm} id="headerColor" className="black sm-text">white</p></div>
</div>
</div>
{/* Footer */}
<hr/>
<p className="italic">Footer Color</p><br/>
<p className="bottom-space-xs">Current: </p> 
<div style={{height:"35px",width:"55px",borderRadius:"7px", marginBottom:"20px"}} className={selectedColor.footerColor+" "+"center-div theGoodShading "}></div>
<div className="row"> 
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="peach-gradient theGoodShading color-swatch"><p onClick={handleForm} id="footerColor" className="sm-text white">peach</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="aqua-gradient theGoodShading color-swatch"><p onClick={handleForm} id="footerColor" className="white sm-text">aqua</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="indigo-gradient theGoodShading color-swatch"><p onClick={handleForm} id="footerColor" className="white sm-text">indigo</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="magenta-gradient theGoodShading color-swatch"><p onClick={handleForm} id="footerColor" className="white sm-text">magenta</p></div>

</div>
</div>
 <div className="row">     
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className=" forest-gradient theGoodShading color-swatch"><p onClick={handleForm} id="footerColor" className="white sm-text">forest</p></div>
</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className=" periwinkle-gradient theGoodShading color-swatch"><p onClick={handleForm} id="footerColor" className="white sm-text">periwinkle</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="chrome-gradient theGoodShading color-swatch"><p onClick={handleForm} id="footerColor" className="white sm-text">chrome</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="cloud-gradient theGoodShading color-swatch"><p onClick={handleForm} id="footerColor" className="black sm-text">white</p></div>
</div>
</div>
{/* Card Color */}
<hr/>
<p className="italic">Card Main Color</p><br/>
<p className="bottom-space-xs">Current: </p> 
<div style={{height:"35px",width:"55px",borderRadius:"7px", marginBottom:"20px"}} className={selectedColor.cardColor+" "+"center-div theGoodShading "}></div>
<div className="row"> 
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="peach-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardColor" className="sm-text white">peach</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div onClick={handleForm} id="headerColor" value="aqua-gradient" className="aqua-gradient theGoodShading color-swatch"><p onClick={handleForm} id="headerColor" className="white sm-text">aqua</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div  className="indigo-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardColor"  className="white sm-text">indigo</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div  className="magenta-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardColor" m className="white sm-text">magenta</p></div>

</div>
</div>
 <div className="row">     
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className=" forest-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardColor" className="white sm-text">forest</p></div>
</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div  className=" periwinkle-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardColor" myco className="white sm-text">periwinkle</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="chrome-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardColor" className="white sm-text">chrome</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="cloud-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardColor" className="black sm-text">white</p></div>
</div>
</div>
{/* Card Button Color */}
<hr/>
<p className="italic">Button Color</p><br/>
<p className="bottom-space-xs">Current: </p> 
<div style={{height:"35px",width:"55px",borderRadius:"7px", marginBottom:"20px"}} className={selectedColor.cardButtonColor+" "+"center-div theGoodShading "}></div>
<div className="row"> 
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="peach-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardButtonColor" className="sm-text white">peach</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div onClick={handleForm} id="headerColor" value="aqua-gradient" className="aqua-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardButtonColor" className="white sm-text">aqua</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div  className="indigo-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardButtonColor"  className="white sm-text">indigo</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div  className="magenta-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardButtonColor" m className="white sm-text">magenta</p></div>

</div>
</div>
 <div className="row">     
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className=" forest-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardButtonColor" className="white sm-text">forest</p></div>
</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div  className=" periwinkle-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardButtonColor" myco className="white sm-text">periwinkle</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="chrome-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardButtonColor" className="white sm-text">chrome</p></div>

</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 pointer bottom-space-sm">
<div className="cloud-gradient theGoodShading color-swatch"><p onClick={handleForm} id="cardButtonColor" className="black sm-text">white</p></div>
</div>
</div>
{/*  */}
</div>

</div>
<hr/><hr/>
<button onClick={showPreview} className="bottom-space top-space save-btn-templater magenta-gradient  "><p className="sm-text ">Preview</p></button>
  </form>
  
</div>
{/* BEGIN PREVIEW */}
{preview &&
//if preview mode activated, show preview. Will not show if no cards are completed.
<div id = "editorPreview" className="margin-all preview-border">
<Header
         orgName={donateTemplate.orgName}
         logo={donateTemplate.logo}
         subheading={donateTemplate.headerText}
         nav1Text={navObj.public.nav1Text}
         nav1={navObj.public.nav1}
         nav2Text={navObj.public.nav2}
         nav2={navObj.public.nav2Text}
         headerColor={donateTemplate.headerColor}
        />
 <div className="row">
{howManyArray.map((n,i)=>{ 
   //
return (
    
<Card
cardColor={donateTemplate.cardColor}
cardButtonColor={donateTemplate.cardButtonColor}
title={ eval(`donateTemplate.card${i+1}Title`)}
description={eval(`donateTemplate.card${i+1}Text`)}
price={eval(`donateTemplate.card${i+1}Price`)}
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
        footerColor={donateTemplate.footerColor}
        
        />
        
</div>
}
{/* END PREVIEW */}
<div className="centered content-card-xl bottom-space infoMessage text-shadow theGoodShading indigo-border">
        <p className="header-text indigo">{messageUi.confirm}</p>
<div classname="infoMessage">
        <p className="md-text magenta outfit-font">{messageUi.alert}<br/></p>
</div>
<button onClick={submitEdits} className="save-btn magenta-gradient" >Yes</button>
</div>
<Footer
footerColor={"indigo-gradient"}
 />
</div>
)
}