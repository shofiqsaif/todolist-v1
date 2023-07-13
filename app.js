//jshint esversion:6

const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(express.static("public"));
const urlencodedParser = bodyParser.urlencoded({extended:false});
const date = require(__dirname+'/date.js');


app.set("view engine", "ejs");

var options = { weekday: 'long', day: 'numeric',month: 'long'};
// var today  = new Date();

// console.log(today.toLocaleDateString("en-US")); // 9/17/2016
// console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016

let title = ["Yah, It's the weekday ! Today is ", "I have to work! Today is "];
let t = 1;
var items = ["Buy Food","Cook Food","Eat Food"];
var works =[];
var item = "";

app.get("/", (req, res) => {
    // var date = new Date();
    var today = date.getDay();

    console.log(today);
    if (today == 6 || today == 0) {
        t = 0;
    }

    res.render("index.ejs", {
        title: title[t],
        day: today,
        newListItems: items,
    });
});

app.get("/work", (req,res)=>{
    res.render("index.ejs", {
        title: "Work",
        day: "",
        newListItems: works,
    });
});

app.post("/",urlencodedParser,(req,res)=>{
    console.log(req.body);
    item = req.body.newItem;


    
    console.log(item);
    if(req.body.list === "Work")
    {
        works.push(item);
        res.redirect('/work');
    }
    else{
        items.push(item);
        res.redirect('/');
    }
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

