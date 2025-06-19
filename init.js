const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

let allChats = ([
    {
    from : "Virat",
    to : "Rohit",
    msg : "Ee saala cup namde",
    created_at : new Date()
    },
    {
    from : "Tommy",
    to : "Grace",
    msg : "I haven't spend a day thinking about you.",
    created_at : new Date()
    },
    {
    from : "Joe",
    to : "Love",
    msg : "I wolf you lovequinn !",
    created_at : new Date()
    },
    {
    from : "Munna",
    to : "Sweety",
    msg : "Bahut takleef hoti hai.",
    created_at : new Date()
    },
    {
    from : "Akshay",
    to : "Katrina",
    msg : "Tell me the collection of tees maar khan ?",
    created_at : new Date()
    },
    {
    from : "Otis",
    to : "Maeve",
    msg : "Please return for season 5.",
    created_at : new Date()
    },
]);

Chat.insertMany(allChats);