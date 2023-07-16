const express = require("express")
const {connectMongoDB} = require("./connection")
const urlRoute = require("./routes/url")
const URL = require("./models/url")

const app =express()
const PORT = 8000

// connection to mongoDB
connectMongoDB("mongodb+srv://kiranjadhav4563:GAPoKjsgjzUTKFpG@cluster0.fffuvdd.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("connected to the mongoDB"))

//midleweres
app.use(express.json())

routes
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