const express = require("express");
const { connectToMongoDB } = require("./connect")
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const path = require("path");



const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDB connected"));

app.set("views engine","ejs");
app.set("views",path.resolve("./views"))

app.use(express.json());   //middleware
app.use("/url",urlRoute);

app.get("/test",async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render('home')
});

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } // Return the updated document
        );

        // Check if the entry exists
        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error fetching URL:", error);
        res.status(500).send("Server error");
    }
});


// app.get('/:shortId', async (req, res) => {
//     const shortId = req.params.shortId
//  const entry =   await URL.findOneAndUpdate({
// shortId
//     }, {$push: {
//         visitHistory:{

//         timestamp: Date.now(),}
//     },
// }
// )
//   res.redirect(entry.redirectURL)
// });


app.listen(PORT, ()=>console.log(`Server Started at PORT:${PORT}`));


// const express = require("express");
// const { connectToMongoDB } = require("./connect");
// const urlRoute = require('./routes/url');
// const URL = require('./models/url');

// const app = express();
// const PORT = 8001;

// connectToMongoDB("mongodb://localhost:27017/short-url")
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err));

// app.use(express.json()); // middleware
// app.use("/url", urlRoute);

// app.get('/:shortId', async (req, res) => {
//     const shortId = req.params.shortId;

//     try {
//         const entry = await URL.findOneAndUpdate(
//             { shortId },
//             {
//                 $push: {
//                     visitHistory: {
//                         timestamp: Date.now(),
//                     },
//                 },
//             },
//             { new: true } // Return the updated document
//         );

//         if (!entry) {
//             return res.status(404).send("Short URL not found");
//         }

//         res.redirect(entry.redirectURL);
//     } catch (error) {
//         console.error("Error fetching URL:", error);
//         res.status(500).send("Server error");
//     }
// });

// app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));




//postman mai url ke liye body mai
// {
//   "url":  "https://www.youtube.com"
// }







