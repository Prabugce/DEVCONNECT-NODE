const express = require("express");
const app = express();
app.listen(7777,()=>{
    console.log("Server started now this listen 7777 port");
});

// app.use((req,res)=>{

//     res.send("hello from the server 1");
// })

app.use("/hello",(req,res)=>{

    res.send("Hello path response");
})

app.use("/test",(req,res)=>{
    res.send("test path response");
})
