require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const fs = require("fs")
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
app.use(express.static(path.join(__dirname,".././uploads"))) //to use multer directory
app.use(express.static(__dirname))
// Port- LISTEN! ~Navi
app.listen(PORT,()=>{
    console.log("Server started on port " + PORT)
})

app.get("/",(req,res)=>{
    console.log("Deliver static index.html")
    res.sendFile(path.join(__dirname,".././client/public","index.html"))
})

const db = mongoose.connection
// MongoDB / Mongoose
// import schemas.js
const schemas = require("./schemas") 
const { useDebugValue } = require("react")
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
    //     console.log(productArr)     //|| handles if the card's title was just the price, without a name
        let itemName = req.body.item || `$${req.body.price} Charitable Donation`// the item id no. to be compared against product array entries
        let itemPrice = req.body.price
        let itemPriceCents = itemPrice * 100
        console.log("Received GET req from client api")
            try{
                const checkoutSession = await stripe.checkout.sessions.create({
                    payment_method_types:["card"],
                    mode:"payment",
                    success_url: "http://localhost:3000/success", //for LOCAL test server
                    // success_url: process.env.SERVER_ADDRESS+"/success",
                    cancel_url:"http://localhost:3000/", //for LOCAL test server
                    // cancel_url:process.env.SERVER_ADDRESS+"/",//FOR BUILD,
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
    //Setting a template from Admin
    app.post("/api/editDonateTemplate",(req,res)=>{
        console.log(req.body)
        const updatedTemplate = req.body
        console.log(fs.readFileSync(req.body.logo.path))
        // res.json("Recieved at server. Thanks.")  //upsert option will insert if no match is found. I.e, replace match, or else add on it's own.
        DonateTemplate.findOneAndReplace({currentTemplate:true},updatedTemplate,{upsert:true},(err,item)=>{
            if(err){
                console.log(err)
                res.status(500)
            }else{
                console.log("Success")
                res.json({
                    message:"Successfully updated active template.",
                    newTemplate:updatedTemplate
                })
            }
        })
    })
    //DonateTemplate.findOneAndUpdate (err,item)=>  set item.isurrentTemplate to TRUE, set Previous treu to FALSE

    // Define MODEL before use as constructor function
    const DonateTemplate = mongoose.connection.model("DonateTemplate",DonateTemplateSchema)
    const fallbackTemplate = schemas.startTemplate
    app.get("/api/loadDonateTemplate",(req,res)=>{
        console.log("ping")
        // console.log(fs.readFileSync(req.file.path))
          DonateTemplate.findOne({currentTemplate:true},(err,doc)=>{
              if(err){
                  console.log(err)
                  res.status(500)
              } else if(!doc){ 
                console.log("Not found?")
                console.log(fallbackTemplate)
                  res.json(fallbackTemplate)
              } else{
                  console.log(doc)
                  res.json(doc)
              }
          })
          

    })

    // From MULTER Tutorial, with changes 
//  Define Multer Storage
// unify the date.now value-
const uniqueString = Date.now().toString(); //with vanilla POST from form, that date.now value is somehow saved to the 
// req.file.path value, matching the storage value. To adjust this, we capture that date.now() on file load, so that it 
//will be the same path for storage as we see in the savedImage.image.data value.

console.log(uniqueString)

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    // destination:"/../uploads/",
    filename:function(req,file,cb){
        cb(null,file.fieldname + "-" + uniqueString) 
    }
})

// var upload = multer({storage:storage}) //no security measures/filters
//  With security filter
//const upload = multer() //technically all you need to upload to default temp file location on disk, with random name for file
const upload = multer({
    storage:storage,
    limits: {
        fileSize:1500000 //limit 1.5MB
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg|pdf)$/)){ //filter out non-images with every Multer call
            return cb(new Error("Please upload an image."))
        }
        cb(undefined,true)
    }
   }) 
app.use((error,req,res,next)=>{
    const message=`This is the Unexpected field: ${error.field}`
    console.log(message)
    return res.status(500).send(message)
})

    // img upload  
const ImageSchema = schemas.ImageSchema
    let ImageModel = db.model("ImageModel",ImageSchema)  
                        // Server
app.post("/api/uploadimage",upload.single("logo"),(req,res,next)=>{ //logo matches name of incoming input file
        console.log(req.body) //DO NOT SEND a fieldname- upload.single creates it for you?
        console.log(req.file)
        
    var savedImage = {
        name:req.body.name,
        contentType:req.body.mimetype,
        image:{
            data:fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)), 
            contentType: "image"
        }
    }
    console.log(savedImage)
   ImageModel.create(savedImage,(err,item)=>{
       if(err){
           console.log(err)
           res.status(500)
       } else{
        console.log("save img complete")
           res.json("successfully uploaded image")
       }
   })
    // if(!image){ //handle error
    //     const error = new Error("Please choose files for upload")
    //     error.httpStatusCode = 400
    //     return next(error)
    // } //if no error then..
    // res.json("Image saved successfully")
})


 
app.get("/",(req,res)=>{
    ImageModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            console.log("success")
            // res.send(items)
            // res.render(".././client/views/imageviewer",{ items: items });
            res.render(".././client/views/index",{ items: items });
        }
    });
    // console.log("Connected")
    //  res.sendFile(path.join(__dirname + "/../client/page2.html"))
    
    //  res.json(`Client connected to server`)
 })
        // Nuke DB
        // DonateTemplate.deleteMany({},(err,doc)=>{
        //     if(err){
        //         console.log(err)
        //     }
        // })
       


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