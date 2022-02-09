const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
// const indexPath = path.resolve(__dirname, "..", "index.html");
const { readFileSync } = require("fs");
const { join } = require("path");
const indexPath2 = readFileSync(join(__dirname, "index.html"), "utf8");

router.get("/", async (req, res) => {
  console.log("aAAAA");
  console.log(__dirname);
  console.log(process.cwd());

  fs.readFile(indexPath2, "utf8", (err, htmlData) => {
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
    htmlData = htmlData
      .replace("<title>Omella</title>", `<title>AAAAAAAAAAA</title>`)
      .replace(replacer, "JAQUELINE");
    // .replace('__META_OG_DESCRIPTION__', post.description)
    // .replace('__META_DESCRIPTION__', post.description)
    // .replace('__META_OG_IMAGE__', post.thumbnail)

    console.log(htmlData);
    return res.send(htmlData);
  });
});

/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/abc", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
