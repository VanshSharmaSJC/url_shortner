const shortid = require("shortid");
const URL = require('../models/url')

async function generateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'})
const ShortId = shortid(8);
await URL.create({
    ShortId: ShortId,
   redirectURL: body.url,
   visitHistory: [],
});
return res.json({id:ShortId});
}

module.exports={
    generateNewShortURL, 
};