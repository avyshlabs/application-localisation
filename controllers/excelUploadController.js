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
      console.log(files);

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
      res.redirect(`/user/preview`);

      //res.json({ fields, files });
    });
  });

router
  .route("/addLabels")
  .get(async (req, res) => {
    // res.send('add labels through excel')
    res.sendFile("addLabel.html", { root: `${__dirname}/../public/html` });
  })
  .post(async (req, res) => {
    const form = formidable({
      multiples: false,
      uploadDir: `${__dirname}/../uploads`,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      if (err) {
        next(err);
        return;
      }
      //console.log(req.file);
      // console.log(files.excelFile.filepath);
      console.log(files);

      const workbook = xlsx.readFile(files.excelFile.filepath);

      let worksheets = {};
      for (const sheetName of workbook.SheetNames) {
        console.log(`---->${sheetName}`);
        worksheets[sheetName] = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
      }

      await excelUploadService.addLabelFromExcel(worksheets, fields.page_id);
      fs.unlink(files.excelFile.filepath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      //res.sendFile("preview.html", { root: `${__dirname}/../public/html` });
      res.redirect(`/excel/dashboard`);

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
    // let result = await excelUploadService.exportTemplate();

    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/template.xlsx`);
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

router.get("/download-addLabels", async (req, res) => {
  try {
    // let result = await excelUploadService.returnTemplate();
    let pageId = req.query.pageId;

    let result = await excelUploadService.exportTemplate(pageId);

    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/addLabels.xlsx`);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Template-addLabels.xlsx"
    );
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

router.get("/download-updateLabels", async (req, res) => {
  try {
    // let result = await excelUploadService.returnTemplate();

    let pageId = req.query.pageId;

    let result = await excelUploadService.updateTemplate(pageId);

    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/updateLabels.xlsx`);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Template-updateLabels.xlsx"
    );
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

router.route("/dashboard").get(async (req, res) => {
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
  res.sendFile("dashboard.html", { root: `${__dirname}/../public/html` });
});

router.get("/download-afterLanguage", async (req, res) => {
  try {
    // let result = await excelUploadService.returnTemplate();

    let result = await excelUploadService.afterLanguage();

    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/afterLanguage.xlsx`);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Template-extraLabels.xlsx"
    );
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});
router
  .route("/updateLabels")
  .get(async (req, res) => {
    // res.send("update labels through excel");
    res.sendFile("updateLabel.html", { root: `${__dirname}/../public/html` });
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

      const workbook = xlsx.readFile(files.excelFile.filepath);

      let worksheets = {};
      for (const sheetName of workbook.SheetNames) {
        console.log(`---->${sheetName}`);
        worksheets[sheetName] = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
      }

      await excelUploadService.updateLabelFromExcel(worksheets);
      fs.unlink(files.excelFile.filepath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      //res.sendFile("preview.html", { root: `${__dirname}/../public/html` });
      res.redirect(`/user/preview`);

      //res.json({ fields, files });
    });
  });

router.route("/templates").get(async (req, res) => {
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
  res.sendFile("downloadTemplates.html", {
    root: `${__dirname}/../public/html`,
  });
});

module.exports = router;
