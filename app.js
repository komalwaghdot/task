const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const Projects = require("./models/project.js");


//const expressLayouts = require('express-ejs-layouts');
const ejsMate=require("ejs-mate");






const app = express();
const projects = require('./init/data.js');

app.set("views", path.join(__dirname, "views"));




// Use express-ejs-layouts middleware
//app.use(expressLayouts);

// Set default layout file
//app.set('layout', './layouts/boilerplate'); // Without .ejs extension
app.engine('ejs',ejsMate);
// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 
// Set EJS as the template engine
app.set('view engine', 'ejs');
app.use(express.json()); // For parsing JSON bodies





// Set the directory for EJS files (default is 'views')
app.set('views', './views'); // Optional if your EJS files are in the default './views' directory
app.set('layout', './layouts/boilerplate'); // Correct path for layout



async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
      console.log("Connection successful");
  })
  .catch((err) => {
      console.log(err);
  });



// Home route
app.get('/', (req, res) => {
  res.render("pages/Show.ejs");
});

//show skills
app.get('/skills', (req, res) => {
  res.render("pages/Skills.ejs");
});

//show about section
app.get('/about', (req, res) => {
  res.render("pages/about.ejs");
});

//show projects
app.get('/projects', (req, res) => {
  res.render("pages/projects.ejs",{  projects});
});

//show my achivements
app.get('/achivements', (req, res) => {
  res.render("pages/achivements.ejs");
});
//show my contact information
app.get('/contact', (req, res) => {
  res.render("pages/contact.ejs");
});
//used to create new project
app.get("/projects/new",(req,res)=>{
  res.render("pages/new.ejs");
});

app.post("/projects",(req,res)=>{
  let {title,description,image,techstack,createdAt,updatedAt}=req.body;
  projects.push({title,description,image,techstack,createdAt,updatedAt});
  console.log(projects);
  res.redirect("/projects");

});
//DELETE ROUTE
app.delete("/projects/:id",(req,res)=>{
  let {id}=req.params;
  let deletedproject= projects.findByIdAndDelete(id);
  console.log(deletedproject);
  res.redirect("/projects");

});




// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
