const express = require("express")
const {connectMongoDB} = require("./connection")
const urlRoute = require("./routes/url")
const URL = require("./models/url")
require("dotenv").config();

const app =express()
const PORT = process.env.PORT

// connection to mongoDB
connectMongoDB(process.env.MONGODB_CONNECTION).then(()=>console.log("connected to the mongoDB"))

//midleweres
app.use(express.json())

// routes
app.use("/url" ,urlRoute)

app.get("/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitHistory:{
                    timestamp:  Date.now()
                }
            }
        }
    )
    res.redirect(entry.redirectURL)
    console.log(entry.redirectURL)
    
})

app.listen(PORT , ()=>console.log(`server is running on PORT:${PORT}`)) 