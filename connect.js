const mongoose = require("mongoose");

const connect = async () => {
  try {
    const uri = "mongodb+srv://manpreetdev100x:Manpreet1@cluster0.qu69nhl.mongodb.net/?appName=Cluster0";


    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connection Established Successfully");
  } catch (e) {
    console.error("❌ Error in MongoDB Connection:", e.message);
  }
};

module.exports = connect;
