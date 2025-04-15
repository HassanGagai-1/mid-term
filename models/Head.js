import { model, Schema } from "mongoose"

const headSchema = new Schema({
  hid: Number,
  headname: String,
  total: Number,
});

export const Head = model("Head", headSchema);
