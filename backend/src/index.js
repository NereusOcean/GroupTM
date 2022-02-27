const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const authRouter = require("./routes/auth.routes");
const schedule = require("./routes/schedule.routes");
const corsMiddleware = require("./middleware/cors.middleware");

const app = express();
const PORT = config.get(`serverPort`);

app.use(express.json());
app.use(corsMiddleware);
app.use("/api/auth", authRouter);
app.use("/api/news", authRouter);
app.use("/api/schedule", schedule);



const start = async () =>{
    try{

        await mongoose.connect(config.get("dbUrl"));

        app.listen(PORT, ()=>{
            console.log(`Server Start on port - ${PORT}`);
        });
    }catch (e){
        console.log(e);
    }
}
start();
