const express = require("express");
const axios = require("axios");
const app = express();

const PORT = 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/joke", async (req, res) => {
  const userName = req.body.name.trim();

  if (!userName) {
    return res.render("index", { error: "Please enter your name!" });
  }

  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    console.log(response);
    const joke = response.data.joke.replace(/Chuck Norris/gi, userName);  //chuck norris is the regualr expression to replace it withe username gi deneotes gloabe and case insensitive
    
    res.render("joke", { userName, joke });
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    res.render("index", { error: "Failed to fetch a joke. Try again!" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
