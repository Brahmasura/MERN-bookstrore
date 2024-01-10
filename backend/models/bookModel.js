import mongoose from "mongoose";

// here creating the schema and deifnin the elements of the data
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
  // the above timestamps i have to read more thoroughly
);

export const Book = mongoose.model("Book", bookSchema);
