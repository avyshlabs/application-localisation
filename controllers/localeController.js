const express = require("express");
const router = express.Router();

const pageLabelService = require('../services/PageLabelService')
const userLanguageService = require('../services/userLanguageService')


//pageId
router.get("/getTranslations", async (req, res) => {
    try {
        const userLangObj = await userLanguageService.getUserLanguage(1)
        console.log(`------------------------------------------------------------> ${userLangObj.Success}`)
        console.log(`------------------------------------------------------------>${userLangObj.userLanguage}`)

      const result = await pageLabelService.getPageLabels(req.query.page_id,userLangObj.userLanguage.languageId)
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

module.exports = router;