const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    githubLink: {
      type: String,
      required: false,
    },
    liveProjectLink: {
      type: String,
      required: false,
    },
  }, {
    timestamps: true,
  });
  

module.exports = mongoose.model('Project', projectSchema);