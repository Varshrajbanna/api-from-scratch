const express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
mongoose.connect("mongodb://127.0.0.1:27017/employees", {
    useNewUrlParser: true,
    useUnifiedTopology: true // Add this option for the latest versions of Mongoose
}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const articlesSchema = new mongoose.Schema({
    name:String,
    role:String
});


const articles = mongoose.model("manager",articlesSchema );
const item = new articles({
    name : "tute",
    role : "dev"
})

item.save().then(()=>console.log("data saved"))
app.get("/articles", async function(req, res) {
    console.log("Fetching articles...");
    try{
        const found = await articles.find();
        console.log("Found articles:", found);
        res.json(found); // Send found articles as JSON response
    }catch(err){
        console.error("Error finding articles:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/articles", async function(req, res){
    const element1 = new articles({
    name:req.body.name,
    role:req.body.name
    });

    try {
        await element1.save(); // Save the element inside the callback function
        res.status(201).send("Article created successfully");
    } catch(err) {
        console.error("Error saving article:", err);
        res.status(500).send("Internal Server Error");
    }
});


app.listen("3000",function(){
    console.log("server is running");
});
