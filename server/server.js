require("dotenv").config()
const express = require("express")
// const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const path = require("path") //utility for formatting url path delivery
const PORT     = process.env.PORT || 4747;
// const DB       = "stripeDB";
// const productList =  require("./products.js")
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
                
               //await productArr //does not evaluate next lines of function until selection returns resolved value of product doc from mongoose query
            //   const matchedProd = productArr.filter((n,i)=>{ 
            //     if(n.id === selectedProd){
            //         return n
            //     }
            //    })
            //   console.log("MATCH PROD")
            //   console.log(matchedProd)
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