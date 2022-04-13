const express = require("express");
const router = express.Router();

const pageLabelService = require("../services/PageLabelService");
const userLanguageService = require("../services/userLanguageService");

const translationService = require('../services/translationService')

//pageId
router.get("/getTranslations", async (req, res) => {
  try {
    let languageId = await detectLanguage(req)
    
    const result = await translationService.getTranslationsForPage(
      req.query.page_id,
      languageId
    );
    if (result.Success) {
      res.statusCode = 200;
      res.contentType("text/html");
      res.json(result);
    } else {
      throw new Error("cannot get translations -- localeController");
    }
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  }
});

let detectLanguage = async (req) =>{
  let userLangObj, languageId;
  if (req.cookies.user !== undefined) {
    userLangObj = await userLanguageService.getUserLanguage(req.cookies.user);
    languageId = userLangObj.userLanguage.languageId;
  }
  else if(req.cookies.language !== undefined) {
    languageId = req.cookies.language
  }
  else if(req.query.lang_id !== undefined) {
    languageId = req.query.lang_id;
  }
  else {
    languageId = 1;
  }
  return languageId;
}

module.exports = router;
