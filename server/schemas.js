const mongoose = require("mongoose")
const DonateTemplate = new mongoose.Schema(
    {
        templateName:String,
        currentTemplate:Boolean,
        orgName:String,
        logo:{
            data: Buffer, //used for storing binary data like image files}
            contentType: String
    },
        headerColor: String,
        footerColor:String,
        backgroundImage:{
            data: Buffer, //used for storing binary data like image files}
            contentType: String
    },
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
const schemas = {
DonateTemplate:DonateTemplate,
JoinTemplate:JoinTemplate,
Admin:Admin,
AdminApplication:AdminApplication
}
module.exports = schemas