require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const path = require("path") //utility for formatting url path delivery
const PORT     = process.env.PORT || 4747;
const DB       = "qvrrDB";

const e = require("express")
app.use(cors())
//Stripe 
// Remember to switch to your live secret key in production. !IMPORTANT
const stripe = require("stripe")(process.env.SECRET_KEY_TEST);

app.use(express.json());//unpack JSON formatted payload / send res.json(payload,(callbaback)=>{....})
app.use(express.urlencoded({ extended: true })); //unpack urlEncoded payload 

// If running node start from sub directory: server
// app.use(express.static( ".././client/public")) //NO path,join() here if launching from /server sub DIR. Only for GET req of index.html

//if running node start from root as start ./server/server.js
app.use(express.static(path.join( __dirname, ".././client/public"))) //!!IMPORTANT!! path,join() here if launching from ROOT with node/nodemon ./server/server.js

// Port- LISTEN! ~Navi
app.listen(PORT,()=>{
    console.log("Server started on port " + PORT)
})

app.get("/",(req,res)=>{
    console.log("Deliver static index.html")
    res.sendFile(path.join(__dirname,".././client/public","index.html"))
})

// MongoDB / Mongoose
// import schemas.js
const schemas = require("./schemas") 
// console.log(schemas.DonateTemplate)
//Establish DB Connection

//FOR BUILD//

// mongoose.connect(process.env.DB_CONNECTION,{ //don't add +DB on the end
//     useUnifiedTopology: true,
//    useNewUrlParser: true,
// //    useCreateIndex: true, deprecated
// //    useFindAndModify: false, deprecated
//    connectTimeoutMS: 10000
// })

// FOR LOCAL ONLY testing connection to Mongo//
mongoose.connect("mongodb://localhost:27017/"+DB,{
   useUnifiedTopology: true,
   useNewUrlParser: true,
   connectTimeoutMS: 10000
   //    useCreateIndex: true, deprecated
//    useFindAndModify: false, deprecated
});
//Connect to DB or Handle Err
mongoose.connection.on("error",(error)=>console.log(error))
mongoose.connection.once("open",()=>console.log(`Connected to database: ${DB}`))


// Stripe Session Init
app.post("/api/stripesession", async (req,res)=>{
       console.log("GET Req")
        console.log(req.body)
        console.log(req.body.price)
    //     console.log(productArr)
        let itemName = req.body.item // the item id no. to be compared against product array entries
        let itemPrice = req.body.price
        let itemPriceCents = itemPrice * 100
        console.log("Received GET req from client api")
            try{
                const checkoutSession = await stripe.checkout.sessions.create({
                    payment_method_types:["card"],
                    mode:"payment",
                    success_url: "http://localhost:3000/success", //for LOCAL test server
                    // success_url: process.env.SERVER_ADDRESS+"/success",
                    // cancel_url: "https://docs.google.com/forms/d/e/1FAIpQLSerhoPRuEFlo5XGAcH8hmnk4EkBJJ0fw15Hv8cM3DPs3zdx9A/viewform",
                    cancel_url:process.env.SERVER_ADDRESS+"/",//INVALID URL ERROR
                    line_items:[
                    {
                        price_data:{
                            currency:"usd",
                            product_data:{
                                name:itemName
                            },
                            unit_amount:itemPriceCents  //Stripe requires prices in CENTS not dollars !IMPORTANT
                        },
                        quantity:1
                    }
                ]
                })
                res.json({url:checkoutSession.url})
    
            }
            catch(err){
                console.log("ERROR:")
                console.log(err.message)
                res.status(500).json({error:err.message})
            }  
              
    })
    const DonateTemplateSchema = schemas.DonateTemplate
    // const DonateTemplateSchema = new mongoose.Schema(
    //     {
    //         templateName:String,
    //         currentTemplate:Boolean,
    //         orgName:String,
    //         logo:Buffer,
    //         headerText:String,
    //         headlineText:String,
    //         footerText:String,
    //         footerSubtext:String,
    //         card1Price:Number,
    //         card2Price:Number,
    //         card3Price:Number,
    //         card4Price:Number,
    //         card1Title:String,
    //         card2Title:String,
    //         card3Title:String,
    //         card4Title:String,
    //         card1Text:String,
    //         card2Text:String,
    //         card3Text:String,
    //         card4Text:String
    //         
    // }
    // )

    //Setting a template from Admin
    app.post("/api/editDonateTemplate",(req,res)=>{
        console.log(req.body)
        const updatedTemplate = req.body
        res.json("Recieved at server. Thanks.")
    })
    //DonateTemplate.findOneAndUpdate (err,item)=>  set item.isurrentTemplate to TRUE, set Previous treu to FALSE

    // Define MODEL before use as constructor function
    const DonateTemplate = mongoose.connection.model("DonateTemplate",DonateTemplateSchema)

    app.get("/api/loadDonateTemplate",(req,res)=>{
        console.log("ping")
          DonateTemplate.findOne({currentTemplate:true},(err,doc)=>{
              if(err){
                  console.log(err)
                  res.json("error")
              } else if
                (!doc){ res.json("not found")
              } else{
                  res.json(doc)
              }
          })
           
           
          
            // res.json(result)
       
      

        // DonateTemplate.find({currentTemplate:true},(err,item)=>{
        //     if(err){
        //         console.log(err)
        //         res.status(500)
              
        //     } else if(!item){
        //         console.log("item not found")
        //        res.json("item not found")
        //     } else{
        //         console.log("Matched: responding to client with found model")
        //         console.log(item)
        //         res.json(item)
                
        //     }
        // })

    })

    // function fillDB(){
    //     // let DonateTemplate = schemas.DonateTemplate()
    //     let template = (
    //         {
    //             templateName:"season of giving",
    //             currentTemplate:true,
    //             orgName:"QVRR Season of Giving",
    //             logo:"images/logo.png",
    //             headerText:"",
    //             headlineText:"",
    //             footerText:"QVRR",
    //             footerSubtext:"Rotary Club Affiliate",
    //             card1Price:5,
    //             card2Price:10,
    //             card3Price:20,
    //             card4Price:50,
    //             card1Title:"$5 Donation",
    //             card2Title:"$10 Donation",
    //             card3Title:"$20 Donation",
    //             card4Title:"$50 Donation",
    //             card1Text:"A donation for $5",
    //             card2Text:"A donation for $10",
    //             card3Text:"A donation for $20",
    //             card4Text:"A donation for $50"
    //             
            
    //     })
    //     DonateTemplate.create(template,(err,item)=>{
    //         if(err){
    //             console.log(err)
    //         } else{
    //             console.log("saved template data")
    //             console.log(item)
    //         }
    //     })

    // }
    // fillDB()