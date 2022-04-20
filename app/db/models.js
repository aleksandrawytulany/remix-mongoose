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
  date_updated: {
    type: Date,
  },
  createdDate: {
    type: String,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "You need an user name"],
    minLength: [3, "That's too short"],
  },
  password: {
    type: String,
    required: [true, "You need a password"],
    minLength: [8, "That's too short"],
  },
},
  { timestamp: true }
);

export const models = [
  {
    name: "Snippet",
    schema: bookSchema,
    collection: "snippets",
  },
  {
    name: "User",
    schema: userSchema,
    collection: "users",
  },
];
