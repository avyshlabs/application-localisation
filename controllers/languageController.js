const express = require("express");
const router = express.Router();

const languageService = require("../services/languageService");

router
  .route("/addLanguage")
  .get(async (req, res) => {
    if (req.query.lang_id !== undefined) {
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
      let lang_name = req.body.Language_name;
      let lang_code = req.body.Language_code;
      let result = await languageService.saveOneLangauage(lang_name, lang_code);
      if (result.Success) {
        res.redirect(`/excel/dashboard`);
      } else res.status(500).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/getAll', async(req, res)=> {
  try{
    let result = await languageService.getAll();
    if(result.Success)
      res.status(200).json(result);
    else  
      res.status(500).json(result);
  }catch(err){
    res.status(500).json(err.message);
  }
})

module.exports = router;
