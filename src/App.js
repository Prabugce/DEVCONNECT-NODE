const express = require("express");
const app = express();
app.listen(7777,()=>{
    console.log("Server started now this listen 7777 port");
});


app.get("/user",(req,res)=>{
    res.send({firstname:"MANI",Role:"Frontend Developer"})
});


app.post("/user",(req,res)=>{
    res.send({firstname:"PRABU",Role:"MERN Stack Developer"})
});


app.use("/ReqHandelers",(req,res,next)=>{

    console.log("RH1")
    next();
},(req,res,next)=>{
    next();
    console.log("RH2")
},(req,res,next)=>{

    console.log("RH3")
  //  res.send("Helooooooo")
    next();
}
)

app.use("/",(req,res)=>{

    res.send("/ reposne");
})