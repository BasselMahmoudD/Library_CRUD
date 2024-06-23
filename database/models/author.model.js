import { Schema, model } from "mongoose";

let schema = Schema({
  name: {
    type: String,
    required:true
  },
  bio: String,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  birthDate: Date
});

export let Author = model("Author" , schema)
