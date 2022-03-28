import { mongoose } from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },
  language: {
    type: String, 
    required: true,
  },
  codeSnippet: {
    type: String, 
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
});

export const models = [
  {
    name: "Snippet",
    schema: bookSchema,
    collection: "snippets",
  },
];
