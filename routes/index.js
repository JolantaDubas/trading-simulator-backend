const Joi = require("joi");
var express = require("express");
const app = require("../app");
var router = express.Router();

const courses = [
  { id: 1, name: "1 course" },
  { id: 2, name: "2 course" },
  { id: 3, name: "3 course" },
];

/* GET home page. */
router.get("/", function (req, res) {
  res.send(`Hello World ${port}`);
});

router.get("/api/courses", function (req, res) {
  res.send(courses);
});

router.get("/api/courses/:id", function (req, res) {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Error 404");
  res.send(course);
});

router.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Error 404");
  validateCourse(req.body);

  course.name = req.body.name;
  res.send(course1);
});

router.post("/api/courses", (req, res) => {
  // const schema = {
  //   name: Joi.string().min(3).required(),
  // };

  // const result = Joi.valid(req.body, schema);
  // console.log(result);

  // if (result.error) {
  //   res.status(400).send(result.error);
  //   return;
  // }
  validateCourse(req.body);
  const course = {
    id: courses.length + 1,
    course: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Error 404");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(courses);
});

router.get("/api/posts/:year/:month", function (req, res) {
  // res.send(req.params);
  res.send(req.query);
});

function validateCourse(course) {
  if (!course.name || course.name.length < 3) {
    res
      .status(400)
      .send("Name is required and should be greater than 3 characters");
  }
}

const port = process.env.PORT || 3000;
module.exports = router;
