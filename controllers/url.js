const shortid = require('shortid');
const URL=require("../models/url")


const handleGenerateNewShortURL=async(req,resp)=>{
    const body = req.body
    if(!body)return resp.status(400).json({error:"url is required"})
    
    const shortID=shortid()
    await URL.create({
        shortId:shortID,
        redirectURL:req.body.url,
        visitHistory:[],
    })
return resp.json({id:shortID})
}


const handleGetAnalytics =async(req, res)=> {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }
module.exports={
    handleGenerateNewShortURL, handleGetAnalytics,
}