const express = require("express");

const monk = require("monk");
const Joi = require("joi");

const db = monk(process.env.MONGO_URI);

db.collection("animals").drop(function (err, delOK) {
  if (err) throw err;
});

const animals = db.get("animals");
const staticAnimals = require("../data");

staticAnimals.forEach(async (animal) => {
  let seed = await db.collection("animals").insert(animal);
});

const schema = Joi.object({
  name: Joi.string().trim().required(),
  species: Joi.string().trim().required(),
});

const router = express.Router();

//READ ALL
router.get("/", async (req, res, next) => {
  try {
    const myAnimals = await animals.find({});
    res.json(myAnimals);
  } catch (error) {
    next(error);
  }
});

//READ ONE
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const thisAnimal = await animals.findOne({
      _id: id,
    });
    if (!thisAnimal) return next();
    return res.json(thisAnimal);
  } catch (error) {
    next(error);
  }
});

//CREATE ONE
router.post("/", async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const inserted = await animals.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

//UPDATE ONE
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await schema.validateAsync(req.body);
    const thisAnimal = await animals.findOne({ _id: id });
    if (!thisAnimal) return next();
    await animals.update(
      {
        _id: id,
      },
      { $set: value }
    );
    res.json(value);
  } catch (error) {
    next(error);
  }
});

//DELETE ONE
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await animals.remove({ _id: id });
    res.json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
