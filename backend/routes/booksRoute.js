import express from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();



// Route to save a new Book to the database
router.post("/", async (req, res) => {
  try {
    // first we will check for validation that all the fields in the req.body has some content
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // now if all fields are presend then create a new document
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    // now save the document in the database
    const book = await Book.create(newBook);

    // now it's time to send the response to the client
    res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
// working

// route to get all books from the database
router.get("/", async (req, res) => {
  try {
    // code to fetch books from the database
    const books = await Book.find({});

    // now giving the response data with an object and a status code
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
// working

// now the route to get one book or single book detail from the database
router.get("/:id", async (req, res) => {
  try {
    // here the code to fetch a single book by it's id
    // destructuring the id from req.params
    const { id } = req.params;
    const book = await Book.findById(id);

    // now returning the response
    return res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
// working

// now the route to update a book in the database
router.put("/:id", async (req, res) => {
  try {
    // first of all we need to validate the data being sent, wether it contains all the fields that we need
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: `Send all required fields: title, author, publishYear`,
      });
    }

    // now here rememeber that we need two things, first the id to target the book and the body to send teh updated data into the database
    const { id } = req.params;

    // now we will be using the default mongoose methods findByIdAndUpdate and pass the id and the body
    const result = await Book.findByIdAndUpdate(id, req.body);

    // now another validation needed to check weather the book is ther or not
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
// tha above has been the most tough one as i encountered many errors on it on postman
// but somehow it is working now

// now the route to delete the data with the help of an id
router.delete("/:id", async (req, res) => {
  try {
    // now the code to delete the book
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ message: "book not found" });
    }

    res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
// working just fine


export default router;
