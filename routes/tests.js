const router = require("express").Router();
const Student = require("../db/models/student");
const Test = require("../db/models/test");

router.get("/", async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.send(tests);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const test = await Test.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(test);
  } catch (error) {
    next(error);
  }
});

router.post("/student/:studentId", async (req, res, next) => {
  try {
    const test = await Test.create(req.body);

    const student = await Student.findByPk (req.params.studentId);

    await test.setStudent(student);

    res.status(201).send(test);

  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Test.destroy({where: {
      id: req.params.id,
    }});
    res.status(204).send();
  }
  catch (error) {
    next(error);
  }
})

module.exports = router;
