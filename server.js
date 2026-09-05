const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home"
    });
});

// Organizations
app.get("/organizations", (req, res) => {
    res.render("organizations", {
        title: "Organizations"
    });
});

// Service Projects
app.get("/projects", (req, res) => {
    res.render("projects", {
        title: "Service Projects"
    });
});

// Categories
app.get("/categories", (req, res) => {
    res.render("categories", {
        title: "Service Project Categories"
    });
});

// 404
app.use((req, res) => {
    res.status(404).send("Sorry, page not found.");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});