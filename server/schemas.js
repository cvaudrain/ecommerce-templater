const mongoose = require("mongoose")

const DonateTemplate = new mongoose.Schema(
    {
        templateName:String,
        currentTemplate:Boolean,
        allowCustomcard:Boolean,
        orgName:String,
        logo: {
            contentType:String,
            imgSrc:String
            // data: {
            //     data:Array,
            //     contentType:String,
            //     //used as img src attr- the product of the buffer converted to String from base64, 
            // } //must convert base64 here not iunside tag like with EJS, because EJS is actually running logic on server, not client.
        },
        backgroundImage: {
            contentType:String,
            imgSrc:String,
            // data: {
            //     data:Array,
            //     contentType:String,
            //     //used as img src attr- the product of the buffer converted to String from base64, 
            // } //must convert base64 here not iunside tag like with EJS, because EJS is actually running logic on server, not client.
        },
    //     logo:{
    //         data: Buffer, //used for storing binary data like image files}
    //         contentType: String
    // },
        headerColor: String,
        footerColor:String,
        cardColor:String,
        cardButtonColor:String,
        headerText:String,
        headlineText:String,
        footerText:String,
        footerSubtext:String,
        card1Price:Number,
        card2Price:Number,
        card3Price:Number,
        card4Price:Number,
        card1Title:String,
        card2Title:String,
        card3Title:String,
        card4Title:String,
        card1Text:String,
        card2Text:String,
        card3Text:String,
        card4Text:String,
        card5Price:Number,
        card6Price:Number,
        card7Price:Number,
        card8Price:Number,
        card5Title:String,
        card6Title:String,
        card7Title:String,
        card8Title:String,
        card1Text:String,
        card2Text:String,
        card3Text:String,
        card4Text:String,
        card5Text:String,
        card6Text:String,
        card7Text:String,
        card8Text:String,
        howMany: Number //determines the length of the array used as reference to map cards in JSX render
}
)
const ImageSchema = new mongoose.Schema({
    contentType:String,
        image: {
            data: Buffer, //used for storing binary data like image files}
            contentType: String,
            name:String
        }
})
 const JoinTemplate = new mongoose.Schema(
     {
         templateName:String,
         currentTemplate:Boolean,
        title:String,
        duesAmount:Number,
        questions :{
            a:String,
            b:String,
            c:String,
            d:String,
            e:String,
            f:String,
            g:String,
            h:String,
            k:String,
            m:String,
            n:String,
            o:String,
            p:String
        }
     }
 )   
 const Admin = new mongoose.Schema({
     name:String,
     email:String,
     password:String
 })
 const AdminApplication = new mongoose.Schema({
    name:String,
    email:String,
    password:String
 })
 let startTemplate ={
    howMany:0,
    currentTemplate:true,
    allowCustomCard:false,
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
        backgroundImage: {
            imageSrc:"",
            contentType:""
        },
        logo:{
            imageSrc:"",
            contentType:"image"
        }        
        

}
const schemas = {
DonateTemplate:DonateTemplate,
JoinTemplate:JoinTemplate,
Admin:Admin,
AdminApplication:AdminApplication,
startTemplate:startTemplate,
ImageSchema:ImageSchema
}


//NOT a schema- just a template


module.exports = schemas