const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
    //   required: true,
    },

    category: {
      type: String,
    //   required: true,
    },

    postedAt: {
      type: Date,
      default: Date.now,  // full date + time
    },

    month: {
      type: String,
      default: () => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[new Date().getMonth()];
      },
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;

