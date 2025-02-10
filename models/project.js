const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String], // Array of technologies used (e.g., ["React", "Node.js", "MongoDB"])
    required: true,
  },
  
  
  image: {
    type: String, // Path or URL of the project image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});



const Project = mongoose.model("Project", projectSchema);
module.exports=Project; 

