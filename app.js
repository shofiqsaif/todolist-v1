//jshint esversion:6

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(express.static("public"));
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const { name } = require("ejs");

var today = date.getDay();

// mongoose.connect("mongodb://0.0.0.0:27017/todolistDB");
mongoose.connect("mongodb+srv://admin-saif:test123@cluster0.sbovxrx.mongodb.net/todolistDB");
const itemSchema = new mongoose.Schema({
    name: String,
});
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema],
});

const Item = mongoose.model("item", itemSchema);
const List = mongoose.model("list", listSchema);

List.find({}).then((r) => {
    if (r.length === 0) {
        const item1 = new Item({ name: "Wake Up" });
        const item2 = new Item({ name: "Cook" });
        const item3 = new Item({ name: "Eat" });
        const list = new List({
            name: "",
            items: [item1, item2, item3],
        });
        list.save();
    }
});

app.set("view engine", "ejs");
let t = 1;
var works = [];

app.get("/", (req, res) => {
    List.findOne({ name: "" }).then((r) => {
        res.render("index.ejs", {
            title: today,
            newListItems: r.items,
        });
    });
});

app.get("/:list", (req, res) => {
    const list = req.params.list;
    List.findOne({ name: list }).then((r) => {
        if (r != null) {
            res.render("index.ejs", {
                title: list,
                newListItems: r.items,
            });
        } else {
            const l = new List({ name: list });
            l.save();
            res.render("index.ejs", {
                title: list,
                newListItems: l,
            });
        }
    });
});
app.post("/", urlencodedParser, (req, res) => {
    item = req.body.newItem;
    listName = req.body.list;

    if (req.body.list === today) {
        List.findOne({ name: "" })
            .then((r) => {
                r.items.push(new Item({ name: item }));
                r.save();
            })
            .then((r) => {
                res.redirect("/");
            });
    } else {
        List.findOne({ name: listName })
            .then((r) => {
                r.items.push(new Item({ name: item }));
                r.save();
            })
            .then(res.redirect("/" + listName));
    }
});

app.post("/delete", urlencodedParser, (req, res) => {
    const itemID = req.body.itemID;
    let listName = req.body.listName;
    if (listName == today) {
        listName = "";
    }

    List.findOne({ name: listName })
        .then((r) => {
            r.items.pull({ _id: itemID });
            r.save();
        })
        .then((r) => {
            res.redirect("/" + listName);
        });
});
app.listen(process.env.port || 3000, () => {
    console.log("server is running on port 3000");
});
