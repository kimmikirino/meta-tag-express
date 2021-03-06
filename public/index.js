const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;
const fs = require("fs");
// const middleware = require("./api/middleware");
// static resources should just be served as they are
app.use(express.static(path.resolve("."), { maxAge: "30d" }));
const indexPath = path.resolve(__dirname, "index.html");

// const { readFileSync } = require("fs");
// const { join } = require("path");
// const indexPath2 = readFileSync(join(__dirname, "/index.html"), "utf8");

app.listen(PORT, (error) => {
  console.log("aAAAA");
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});

app.get("/api", (req, res, next) => {
  console.log("aAAAA");
  console.log(process.cwd());
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }
    // get post info
    const postId = req.query.id;
    console.log(postId);
    // const post = getPostById(postId);
    // if(!post) return res.status(404).send("Post not found");
    const search = "Omella: Payments, forms and signatures, all in one place";
    const replacer = new RegExp(search, "g");
    // inject meta tags
    const randomNum = Math.random();
    htmlData = htmlData
      .replace("<title>Omella</title>", `<title>${randomNum}</title>`)
      .replace(replacer, `${randomNum} - Jaqueline`);
    // .replace('__META_OG_DESCRIPTION__', post.description)
    // .replace('__META_DESCRIPTION__', post.description)
    // .replace('__META_OG_IMAGE__', post.thumbnail)

    console.log(htmlData);
    return res.send(htmlData);
  });
});

module.exports = app;
