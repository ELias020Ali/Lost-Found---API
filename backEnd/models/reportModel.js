const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      required: true,
    },
    item_type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    posted_date: {
      type: Date,
      default: Date.now,
    },
    image: {
      data: Buffer, 
      contentType: String,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  { collection: "Reports" }
);

module.exports = mongoose.model("Report", reportSchema);