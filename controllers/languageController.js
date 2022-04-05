const express = require("express");
const router = express.Router();

const languageService = require("../services/languageService");
const userLanguageService = require('../services/userLanguageService')

router
  .route("/addLanguage")
  .get(async (req, res) => {
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
    res.sendFile("addLanguage.html", { root: `${__dirname}/../public/html` });
  })
  .post(async (req, res) => {
    try {
      console.log(req.body);
      let details = req.body.Language_name;
      let result = await languageService.saveOneLangauage(details);
      if (result.Success) {
        res.redirect(`/user/uploadFile`);
        //res.status(200).json(result);
      } else res.status(500).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
