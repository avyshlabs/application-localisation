const express = require("express");
const router = express.Router();

const fs = require("fs");
const xlsx = require("xlsx");
const formidable = require("formidable");
const excel = require("exceljs");

const excelUploadService = require("../services/excelUploadService");

const languageDAO = require("../DAO/languageDAO");

router.route("/preview").get(async (req, res) => {
  res.sendFile("preview.html", { root: `${__dirname}/../public/html` });
  // fs.unlink(req.query.path, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });

});

router
  .route("/uploadFile")
  .get(async (req, res) => {
    //C:\Users\HP\Desktop\Avysh\excel_import_export\controllers\Book1.xlsx
    // const workbook = xlsx.readFile("C:/Users/HP/Desktop/Avysh/excel_import_export/controllers/Book1.xlsx");
    // let worksheets = {};
    // for (const sheetName of workbook.SheetNames) {
    //   console.log(`---->${sheetName}`);
    //   worksheets[sheetName] = xlsx.utils.sheet_to_json(
    //     workbook.Sheets[sheetName]
    //   );
    // }
    // res.send(worksheets);
    res.sendFile("upload.html", { root: `${__dirname}/../public/html` });
  })
  .post(async (req, res) => {
    const form = formidable({
      multiples: false,
      uploadDir: `${__dirname}/../uploads`,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      //console.log(req.file);
      // console.log(files.excelFile.filepath);
      console.log(files)

      const workbook = xlsx.readFile(files.excelFile.filepath);

      let worksheets = {};
      for (const sheetName of workbook.SheetNames) {
        console.log(`---->${sheetName}`);
        worksheets[sheetName] = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
      }

      await excelUploadService.addExcelToDatabase(worksheets);
      fs.unlink(files.excelFile.filepath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      //res.sendFile("preview.html", { root: `${__dirname}/../public/html` });
      res.redirect(`preview`)

      //res.json({ fields, files });
    });
  });

// router.get('/download', async (req,res) => {
//   try {

//     const workbook = xlsx.readFile("./template.xlsx");
//     let worksheets = {};
//     for (const sheetName of workbook.SheetNames) {
//       console.log(`---->${sheetName}`);
//       worksheets[sheetName] = xlsx.utils.sheet_to_json(
//         workbook.Sheets[sheetName]
//     );
//   }

//     let languages = await languageDAO.getLanguages();

//     worksheets.Language.push(
//       languages.language[0]

//     )

//     await xlsx.utils.sheet_add_json(workbook.Sheets['Language'],worksheets.Language)
//     await xlsx.writeFile(workbook, "./template.xlsx")

//     const wb = new excel.Workbook();

//     await wb.xlsx.readFile("./template.xlsx")

//     res.setHeader('Content-Type',"application/vnd.openxmlformats-officedocument.spreadsheet.sheet");
//     res.setHeader('Content-Disposition', 'attachment; filename='+'Template.xlsx')

//     return wb.xlsx.write(res);

//   }
//   catch(err) {
//     console.log(err);
//     res.send(err)
//   }
// })

router.get("/download-template", async (req, res) => {
  try {
    let result = await excelUploadService.returnTemplate();
    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile("./Template.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Template-download.xlsx"
    );
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

module.exports = router;
