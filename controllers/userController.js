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
      res.cookie("language", req.query.lang_id, {
        httpOnly: true,
        expire: new Date() + 9999,
      });
      // let result = await userLanguageService.updateUserLanguage(
      //   1,
      //   req.query.lang_id
      // );
      // if (result.Success) {
      //   console.log("language changed successfully");
      // }
    }
    res.statusCode = 200;
    res.sendFile("login.html", { root: `${__dirname}/../public/html` });
    //res.send("welcome to login Page");
  })
  .post(async (req, res) => {
    console.log("reached here --------");
    const result = await userService.getUsers();
    let flag = false;
    let userId;
    console.log(
      `------------------------------------------------------------------------>>>>>>>>>>>>${req.body.userName}`
    );
    if (result.Success) {
      result.users.map((user) => {
        if (user.Username === req.body.userName) {
          flag = true;
          userId = user.User_id;
          res.cookie("user", user.User_id, {
            httpOnly: true,
            expire: new Date() + 9999,
          });
        }
      });
    } else {
      throw new Error("cannot get users -- userController");
    }
    if (flag) {
      const userLangObj = await userLanguageService.getUserLanguage(userId);

      res.cookie("language", userLangObj.userLanguage.languageId, {
        httpOnly: true,
        expire: new Date() + 9999,
      });
      res.statusCode = 200;
      res.sendFile("dashboard.html", { root: `${__dirname}/../public/html` });
    } else {
      res.statusCode = 200;
      res.sendFile("login.html", { root: `${__dirname}/../public/html` });
    }
    //res.redirect("/user/dashboard");
  });

router
  .route("/signup")
  .get(async (req, res) => {
    if (req.query.lang_id !== undefined) {
      res.cookie("language", req.query.lang_id, {
        httpOnly: true,
        expire: new Date() + 9999,
      });
      // let result = await userLanguageService.updateUserLanguage(
      //   1,
      //   req.query.lang_id
      // );
      // if (result.Success) {
      //   console.log("language changed successfully");
      // }
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

router.get("/uploadFile", async (req, res) => {
  try {
    if (req.query.lang_id !== undefined) {
      if (req.cookies.user !== undefined) {
        let userId = req.cookies.user;
        let result = await userLanguageService.updateUserLanguage(
          userId,
          req.query.lang_id
        );
        if (result.Success) {
          console.log("language changed successfully");
        }
      }
      res.cookie("language", req.query.lang_id, {
        httpOnly: true,
        expire: new Date() + 9999,
      });
    }
    res.statusCode = 200;
    res.sendFile("upload.html", { root: `${__dirname}/../public/html` });
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  }
});

router.route("/preview").get(async (req, res) => {
  try {
    if (req.query.lang_id !== undefined) {
      if (req.cookies.user !== undefined) {
        let userId = req.cookies.user;
        let result = await userLanguageService.updateUserLanguage(
          userId,
          req.query.lang_id
        );
        if (result.Success) {
          console.log("language changed successfully");
        }
      }
      res.cookie("language", req.query.lang_id, {
        httpOnly: true,
        expire: new Date() + 9999,
      });
    }
    res.statusCode = 200;
    res.sendFile("preview.html", { root: `${__dirname}/../public/html` });
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  }

  // fs.unlink(req.query.path, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
});

router.get("/logout", (req, res, next) => {
  try {
    res.clearCookie("user");
    res.clearCookie("language");
    res.statusCode = 200;
    res.sendFile("login.html", { root: `${__dirname}/../public/html` });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ Success: false, Error: err });
  }
});

module.exports = router;
