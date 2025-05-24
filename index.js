const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id : uuidv4(),
        username : "Shobhit",
        content : "This is my first post"
    },
    {
        id : uuidv4(),
        username : "Shreya",
        content : "I love waching movies."
    },
    {
        id : uuidv4(),
        username : "Nihal",
        content : "I am from IIT Delhi."
    }
]

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.get("/post", (req, res) => {
    res.render("home.ejs", {posts});
});

app.get("/post/new", (req, res) => {
    res.render("login.ejs");
});

app.post("/post", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id,username, content});
    res.redirect("/post");
});

app.get("/post/:id", (req, res) => {
    let { id } = req.params;
    let pt = posts.find((p) => id === p.id);
    res.render("Show.ejs",{pt});
});

app.patch("/post/:id", (req,res) => {
    let {id} = req.params;
    let newcontent = req.body.content;
    // console.log(id);
    // console.log(newcontent);
    let pt = posts.find((p) => id === p.id);
    pt.content = newcontent;
    res.redirect("/post");
});
app.get("/post/:id/edit", (req, res) => {
    let {id} = req.params;
    let pt = posts.find((p) => id === p.id);
    res.render("edit.ejs", {pt});
});

app.delete("/post/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/post");
});

app.listen(port, () => {
    console.log(`listing on port ${port}`);
});