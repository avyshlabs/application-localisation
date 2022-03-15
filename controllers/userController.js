const express = require("express");
const router = express.Router();

const userService = require("../services/userService");

router
  .route("/login")
  .get(async (req, res) => {
    res.send("welcome to login Page");
  })
  .post(async (req, res) => {});

router
  .route("/signup")
  .get(async (req, res) => {
    res.send("welcome to signUp Page");
  })
  .post(async (req, res) => {
    try {
      const result = await userService.saveUser(req.body);
      if (result.Success) {
        res.statusCode = 200;
        res.contentType("text/html");
        res.json(result);
      } else {
        throw new Error("cannot add user -- userController");
      }
    } catch (err) {
      res.status = 500;
      res.json(err);
    }
  });

router.get("/getUsers", async (req, res) => {
  try {
    const result = await userService.getUsers();
    if (result.Success) {
      res.statusCode = 200;
      res.contentType("text/html");
      res.json(result);
    } else {
      throw new Error("cannot get users -- userController");
    }
  } catch (err) {
    res.status = 500;
    res.json(err);
  }
});

router.get("/getUser", async (req, res) => {
  try {
    const result = await userService.getUserById(req.query.userId);
    if (result.Success) {
      res.statusCode = 200;
      res.contentType("text/html");
      res.json(result);
    } else {
      res.status = 500;
      res.json(result);
    }
  } catch (err) {
    res.status = 500;
    res.json(err);
  }
});

router
  .route("/updateUser")
  .get(async (req, res) => {
    res.send("welcome to edit user Page");
  })
  .put(async (req, res) => {
    try {
      const result = await userService.updateUser(req.query.userId, req.body);
      if (result.Success) {
        res.statusCode = 200;
        res.contentType("text/html");
        res.json(result);
      } else {
        res.status = 500;
        res.json(result);
      }
    } catch (err) {
      res.status = 500;
      res.json(err);
    }
  });

  router.delete("/deleteUser", async (req, res) => {
    try {
      const result = await userService.deleteUser(req.query.userId);
      if (result.Success) {
        res.statusCode = 200;
        res.contentType("text/html");
        res.json(result);
      } else {
        res.status = 500;
        res.json(result);
      }
    } catch (err) {
      res.status = 500;
      res.json(err);
    }
  });

module.exports = router;
