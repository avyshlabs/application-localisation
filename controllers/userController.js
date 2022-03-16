const express = require("express");
const router = express.Router();

const userService = require("../services/userService");
const userLanguageService = require("../services/userLanguageService");

//res.cookie(cookieName, value, {options})   --> set cookie
//req.cookies.token;  --> to access cookie

router
  .route("/login")
  .get(async (req, res) => {
    if (req.query.lang_id !== undefined) {
      let result = await userLanguageService.updateUserLanguage(1, req.query.lang_id);
      if(result.Success) {
        console.log('language changed successfully')
      }
    }
    res.statusCode = 200;
    res.sendFile("login.html", { root: `${__dirname}/../public/html` });
    //res.send("welcome to login Page");
  })
  .post(async (req, res) => {
    res.redirect("/user/dashboard");
    // res.statusCode = 200;
    // res.sendFile("dashboard.html", { root: `${__dirname}/../public/html` });
  });

router
  .route("/signup")
  .get(async (req, res) => {
    if (req.query.lang_id !== undefined) {
      let result = await userLanguageService.updateUserLanguage(1, req.query.lang_id);
      if(result.Success) {
        console.log('language changed successfully')
      }
    }
    res.statusCode = 200;
    res.sendFile("signup.html", { root: `${__dirname}/../public/html` });
    //res.send("welcome to signUp Page");
  })
  .post(async (req, res) => {
    try {
      const result = await userService.saveUser(req.body);
      if (result.Success) {
        res.statusCode = 200;
        res.contentType("text/html");
        res.sendFile("login.html", { root: `${__dirname}/../public/html` });
        //res.json(result);
      } else {
        throw new Error("cannot add user -- userController");
      }
    } catch (err) {
      res.statusCode = 500;
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
    res.statusCode = 500;
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
      res.statusCode = 500;
      res.json(result);
    }
  } catch (err) {
    res.statusCode = 500;
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
        res.statusCode = 500;
        res.json(result);
      }
    } catch (err) {
      res.statusCode = 500;
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
      res.statusCode = 500;
      res.json(result);
    }
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  }
});

router.get("/changeLanguage", async (req, res) => {
  try {
    const result = await userLanguageService.updateUserLanguage(
      req.query.userId,
      req.query.languageId
    );
    if (result.Success) {
      res.statusCode = 200;
      res.contentType("text/html");
      res.json(result);
    } else {
      res.statusCode = 500;
      res.json(result);
    }
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  }
});

router.get("/getLanguage", async (req, res) => {
  try {
    const result = await userLanguageService.getUserLanguage(req.query.userId);
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

router.get("/dashboard", async (req, res) => {
  try {
    if (req.query.lang_id !== undefined) {
      let result =await userLanguageService.updateUserLanguage(1, req.query.lang_id);
      if(result.Success) {
        console.log('language changed successfully')
      }
    }
    res.statusCode = 200;
    res.sendFile("dashboard.html", { root: `${__dirname}/../public/html` });
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  }
});

module.exports = router;
