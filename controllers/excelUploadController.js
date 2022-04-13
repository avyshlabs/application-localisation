const express = require("express");
const router = express.Router();

const fs = require("fs");
const xlsx = require("xlsx");
const formidable = require("formidable");
const excel = require("exceljs");

const excelUploadService = require("../services/excelUploadService");
const userLanguageService = require("../services/userLanguageService");


router.get("/addLabels", async (req, res) => {
  res.sendFile("addLabel.html", {
    root: `${__dirname}/../public/html`,
  });
});

router.get("/newLanguage", (req, res) => {
  res.sendFile("onNewLanguage.html", {
    root: `${__dirname}/../public/html`,
  });
});

router.route("/dashboard").get(async (req, res) => {
  if (req.query.lang_id !== undefined) {
    res.cookie("language", req.query.lang_id, {
      httpOnly: true,
      expire: new Date() + 9999,
    });
  }
  res.sendFile("dashboard.html", { root: `${__dirname}/../public/html` });
});

router
  .route("/addLabelsForPage")
  .get(async (req, res) => {
    res.sendFile("addLabelsForPage.html", {
      root: `${__dirname}/../public/html`,
    });
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
        worksheets[sheetName] = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
      }

      await excelUploadService.addLabelFromExcel2(worksheets, fields.page_id);
      fs.unlink(files.excelFile.filepath, (err) => {
        if (err) {
        }
      });
      res.redirect(`/excel/dashboard`);
    });
  });


//DOWNLOAD EXCEL FOR NEW PAGE LABELS
router.get("/download-addLabels", async (req, res) => {
  try {
    let result = await excelUploadService.onNewPage();

    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/writeTemplate.xlsx`);
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
    res.status(500).json("Error");
  }
});

//DOWNLOAD UPDATE LABELS TEMPLATE
router.get("/download-updateLabels", async (req, res) => {
  try {
    let result = await excelUploadService.updateTemplate();

    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/writeTemplate.xlsx`);
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
    res.status(500).json(err.message);
  }
});


//TEMPLATE TO ADD LABELS ON NEW LANGUAGE
router.get("/download-onNewLanguage", async (req, res) => {
  try {
    let langId = req.query.language_id;
    let result = await excelUploadService.onNewLanguage(langId);

    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/writeTemplate.xlsx`);
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
    res.status(500).json("Error");
  }
});

router
  .route("/updateLabels")
  .get(async (req, res) => {
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
        worksheets[sheetName] = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
      }

      let updateResult = await excelUploadService.updateLabelFromExcel(worksheets);
      fs.unlink(files.excelFile.filepath, (err) => {
        if (err) {
        }
      });
      res.redirect(`/excel/dashboard`);
    });
  });

router
  .route("/addLabelsForNewLanguage2")
  .get(async (req, res) => {
    res.send("welcome to add labels for new language page");
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
      let languageId;
      for (const sheetName of workbook.SheetNames) {
        languageId = sheetName.substring(0, sheetName.indexOf(" "));
        worksheets[languageId] = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
      }
      let saveResult = await excelUploadService.addLabelsForNewLanguage2(
        worksheets,
        languageId
      );
      fs.unlink(files.excelFile.filepath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.redirect("/excel/dashboard");
    });
  });

module.exports = router;
