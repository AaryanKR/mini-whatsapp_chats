const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

main().then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

//index route
app.get("/chats", async (req , res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs" , {chats});
});

//new route
app.get("/chats/new" , (req , res) => {
    res.render("new.ejs");
});

//create route
app.post("/chats" , (req , res) => {
    let {from , to , msg} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    });
    newChat.save().then(() => {
        console.log("chat was saved");
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
})

//edit route
app.get("/chats/:id/edit" , async (req , res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id); 
    res.render("edit.ejs" , {chat});
});

//update route
app.put("/chats/:id" , async (req , res) => {
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedMsg = await Chat.findByIdAndUpdate(id , {msg : newMsg} , {runValidators : true , new : true});
    console.log(updatedMsg);
    res.redirect("/chats");
});

//delete route
app.delete("/chats/:id" , async (req , res) => {
    let {id} = req.params;
    let delChat = await Chat.findByIdAndDelete(id);
    console.log(delChat);
    res.redirect("/chats");
});

app.get("/" , (req,res) => {
    res.send("root is working");
});

app.listen(port , () => {
    console.log("app is listening on port ",port);
});