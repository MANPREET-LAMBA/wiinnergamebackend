const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  month: { 
    type: String, 
    default: () => new Date().toLocaleString("en-US", { month: "long" }) 
  } // auto default month (e.g. "November")
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
