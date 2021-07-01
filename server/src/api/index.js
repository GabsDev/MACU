const express = require("express");
const emojis = require("./emojis");
const animals = require("../animals/animals");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/animals", animals);
module.exports = router;
