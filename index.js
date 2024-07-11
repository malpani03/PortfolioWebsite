const express =require('express');
const cors=require('cors')
require('dotenv').config();
const connectDB =require('./config/db');
const router=require('./routes')

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api",router);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Connected to DB");
      console.log("Server is running on port", PORT);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

startServer();