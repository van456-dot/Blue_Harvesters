const express = require("express");
const app = express();
const PORT = 8080;          

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/rainwater/calc",(req,res)=>{
    res.redirect("http://localhost:5173/");
})

app.post("/rainwater/calc",(req,res)=>{
    let data = req.body;
    res.redirect("http://localhost:5173/");
})

app.listen(PORT,()=>{
    console.log("App is listining on port",PORT);
});