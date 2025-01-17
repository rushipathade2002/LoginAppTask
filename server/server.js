require("dotenv").config();
const express = require ("express");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error_middleware");
const app = express();

// let tackle cors
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credential:true,
};

app.use(cors(corsOptions))
app.use(express.json());

app.use("/api/auth", authRoute)




app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
});
})

// app.listen(PORT, ()=>{
//     console.log(`Server is running at port ${PORT}`);
// });

// npm i dotenv ->security pur