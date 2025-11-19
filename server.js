const express = require("express");
const app = express();
const connectdb = require("./connect")
const cors = require('cors');
const Blog = require('./models/blog')
const Post = require("./models/Performacesheet"); // Your Post model
const adminroute = require("./routes/adminRoutes")
const multer = require("multer");
const cloudinary = require("./config/cloudinary");


const upload = multer({ dest: "uploads/" });
require("dotenv").config();
app.use(cors());
app.use(express.json());
connectdb();
app.get("/", (req, res) => {
    res.send("hello hi");
})

app.use("/api/admin",adminroute)

app.post("/api/blogs",upload.single("image"),async(req,res)=>{
    console.log(req.body);
     console.log(req.file.path);
    
    const { title, description } = req.body;
    try {

      const result = await cloudinary.uploader.upload(req.file.path);
      image= result.secure_url

        const newBlog = new Blog({ title, description, image });
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog })
    } catch (error) {
      console.log(error);
      
        res.status(500).json({ error: error.message });
    }
})

// Get All Blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get Single Blog
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete Blog
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//---------------------------

app.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file.path);

    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;

    const newPost = new Post({ imageUrl, category });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get All Posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Post
app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// const PORT = 3001;
app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));