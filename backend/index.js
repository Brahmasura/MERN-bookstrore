import express from "express";
// import bodyparser from "body-parser";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// using the middleware to parse json
app.use(express.json());

// implementing cors middleware 
// option 1 allow all request with default headers
app.use(cors());

// option 2 allow custom origins, which is a better way to do so
// app.use(cors({
//   origin:'http://localhost:5173',
//   methods:['GET', 'POST', 'PUT', 'DELETE'],
//   allwedHeaders:['Content Type'],
// }));

// creating the first get route on endpoint "/"
app.get("/", (req, res) => {
  console.log("request is:", req);
  return res.status(234).send("hi this is book store mern project");
});
// it's working


// this one is a very important middleware in which we are using this to tell that all the url with /books should be 
// be handled with these routes which are defined in the booksRoute.js file
app.use("/books", booksRoute);


// establishing connection for the server of node js and the mongo db
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to the database");
    app.listen(PORT, () => {
      console.log(`the server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
