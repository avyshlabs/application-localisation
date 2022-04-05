const express = require("express");
const router = express.Router();

const PageService = require("../services/PageService");

// router.
// route('/')
// .get(async(req, res)=> {
//     try{
//         let name = req.query.name;
//         let page = await PageService.getPage(name);
//         if(page.Success)
//             res.status(200).json(page);
//         else
//             res.status(500).json(page);
//     }catch(err){
//         console.log(err);
//         res.status(500).json(err);
//     }
// })
// .post(async(req, res)=> {
//     try{
//         let details = req.body;
//         let page = await PageService.createPage(details);
//         if(page.Success)
//             res.status(200).json(page);
//         else
//             res.status(500).json(page);
//     }catch(err){
//         console.log(err);
//         res.status(500).json(err);
//     }
// })

router
  .route("/addPage")
  .get(async (req, res) => {
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
      res.sendFile("addPage.html", { root: `${__dirname}/../public/html` });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      let details = req.body.Page_name;
      let result = await PageService.saveOnePage(details);
      if (result.Success) {
        res.redirect(`/user/uploadFile`);
        //res.status(200).json(result);
      } else res.status(500).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get("/getPages", async (req, res) => {
  const result = await PageService.getPages();
  res.json(result);
});

module.exports = router;
