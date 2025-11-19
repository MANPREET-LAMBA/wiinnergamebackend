const express = require("express") ;
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken") ;
const Admin = require("../models/Admin.js") ;

const router = express();
router.use(express.json());

// ✅ Admin Register (for first-time setup only)
router.post("/register", async (req, res) => {
    console.log(req.body);
    
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin Login
router.post("/login", async (req, res) => {
    console.log("in login");
    
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT
    const token = jwt.sign({ id: admin._id }, "secretkey123", { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
