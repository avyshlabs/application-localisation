const excel = require("exceljs");

const languageService = require("./languageService");
const pageService = require("./PageService");
const labelService = require("./LabelService");
const pageLabelService = require("./PageLabelService");

const sequelize = require("../DAO/database");

exports.deleteRows = async (sheet) => {
  try {
    sheet.eachRow((row, rowId) => {
      row.eachCell((col, colId) => {
        // console.log(rowId + " " + colId);
        if (rowId != 1) col.value = "";
      });
    });
    return;
  } catch (err) {
    console.log(err.message);
    return { Success: false, Error: err };
  }
};

exports.addExcelToDatabase = async (worksheets) => {
  try {
    console.log("inside excelUploadService");
    if (
      worksheets.Language === undefined ||
      worksheets.Page === undefined ||
      worksheets.Label === undefined ||
      worksheets.Page_map === undefined
    ) {
      throw new Error("all tables must be there in the excel file");
    }

    return sequelize
      .transaction(async (t) => {
        for (const languageObj of worksheets.Language) {
          let result = await languageService.getLanguageById(
            languageObj.Language_id
          );

          if (result.Success) {
            let updateResult = await languageService.update(
              languageObj.Language_id,
              languageObj,
              t
            );
            if (!updateResult.Success) throw new Error();
          } else {
            let saveResult = await languageService.saveLangauage(
              languageObj.Language_name,
              t
            );
            if (!saveResult.Success) throw new Error();
          }
        }

        for (const pageObj of worksheets.Page) {
          let result = await pageService.getPageById(pageObj.Page_id);
          if (result.Success) {
            let updateResult = await pageService.update(
              pageObj.Page_id,
              pageObj,
              t
            );
            if (!updateResult.Success) throw new Error();
          } else {
            let saveResult = await pageService.createPage(
              { name: pageObj.Page_name },
              t
            );
            if (!saveResult.Success) throw new Error();
          }
        }

        for (const labelObj of worksheets.Label) {
          let result = await labelService.getLabelById(labelObj.Label_id);
          if (result.Success) {
            let updateResult = await labelService.update(
              labelObj.Label_id,
              labelObj,
              t
            );
            if (!updateResult.Success) throw new Error();
          } else {
            let saveResult = await labelService.createLabel(
              {
                label_name: labelObj.Label_name,
                label_value: labelObj.Label_value,
                language_id: labelObj.Language_id,
              },
              t
            );
            if (!saveResult.Success) throw new Error();
          }
        }
        for (const pageLabelObj of worksheets.Page_map) {
          let result = await pageLabelService.getPageLabelById(
            pageLabelObj.Page_map_id
          );
          if (result.Success) {
            let updateResult = await pageLabelService.update(
              pageLabelObj.Page_map_id,
              pageLabelObj,
              t
            );
            if (!updateResult.Success) throw new Error();
          } else {
            let saveResult = await pageLabelService.createPageLabel(
              {
                page: pageLabelObj.Page_id,
                label: pageLabelObj.Label_id,
              },
              t
            );
            if (!saveResult.Success) throw new Error();
          }
        }
      })
      .then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
        console.log(`-----------------------------> committed`);
      })
      .catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log("------------------------------> Rolled back");
        console.log(err);
      });

    // for (const languageObj of worksheets.Language) {
    //   await languageService.saveLangauage(languageObj.Language_name);
    // }

    // for (const pageObj of worksheets.Page) {
    //   await pageService.createPage({name: pageObj.Page_name});
    // }

    // for (const labelObj of worksheets.Label) {
    //   await labelService.createLabel({
    //     label_name: labelObj.Label_name,
    //     label_value: labelObj.Label_value,
    //     language_id: labelObj.Language_id,
    //   })
    // }
    // for (const pageLabelObj of worksheets.Page_map) {
    //   await pageLabelService.createPageLabel({
    //       page:pageLabelObj.Page_id,
    //       label:pageLabelObj.Label_id
    //   })
    // }
  } catch (err) {
    console.log(err);
  }
};

exports.returnTemplate = async () => {
  try {
    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile("./Template.xlsx");

    let languageSheet = workbook.getWorksheet("Language");
    let labelSheet = workbook.getWorksheet("Label");
    let pageSheet = workbook.getWorksheet("Page");
    let pagemapSheet = workbook.getWorksheet("Page_map");

    //SET COLUMN WIDTH, HEADERS AND KEYS
    languageSheet.columns = [
      { header: "Language_id", key: "Language_id", width: 18 },
      { header: "Language_name", key: "Language_name", width: 20 },
      { header: "Created_date", key: "Created_date", width: 28 },
      { header: "Updated_date", key: "Updated_date", width: 28 },
    ];

    labelSheet.columns = [
      { header: "Label_id", key: "Label_id", width: 18 },
      { header: "Label_name", key: "Label_name", width: 28 },
      { header: "Label_value", key: "Label_value", width: 28 },
      { header: "Language_id", key: "Language_id", width: 28 },
      { header: "Created_date", key: "Created_date", width: 28 },
      { header: "Updated_date", key: "Updated_date", width: 28 },
      { header: "Status", key: "Status", width: 20}
    ];

    pageSheet.columns = [
      { header: "Page_id", key: "Page_id", width: 18 },
      { header: "Page_name", key: "Page_name", width: 20 },
      { header: "Created_date", key: "Created_date", width: 28 },
      { header: "Updated_date", key: "Updated_date", width: 28 },
      { header: "Status", key: "Status", width: 20}
    ];

    pagemapSheet.columns = [
      { header: "Page_map_id", key: "Page_map_id", width: 20 },
      { header: "Page_id", key: "Page_id", width: 18 },
      { header: "Label_id", key: "Label_id", width: 18 },
      { header: "Created_date", key: "Created_date", width: 28 },
      { header: "Updated_date", key: "Updated_date", width: 28 },
      { header: "Status", key: "Status", width: 20}
    ];

    //GET EXISTING DATA FROM DATABASE
    let languages = await languageService.getAll();
    let pages = await pageService.getAll();
    let labels = await labelService.getAll();
    let pageMaps = await pageLabelService.getAll();

    //RETRIEVE THE SPECIFIC DATA
    let language = languages.Language;
    let page = pages.Page;
    let label = labels.Label;
    let pageMap = pageMaps.Pagemap;

    //CREATE ARRAYS OF ARRAY OF DATA
    let result1 = language.map((object) => {
      return [
        object.Language_id,
        object.Language_name,
        object.Created_date,
        object.Updated_date,
        object.Status
      ];
    });

    let result2 = page.map((object) => {
      return [
        object.Page_id,
        object.Page_name,
        object.Created_date,
        object.Updated_date,
        object.Status
      ];
    });

    let result3 = label.map((object) => {
      return [
        object.Label_id,
        object.Label_name,
        object.Label_value,
        object.Language_id,
        object.Created_date,
        object.Updated_date,
        object.Status
      ];
    });

    let result4 = pageMap.map((object) => {
      return [
        object.Page_map_id,
        object.Page_id,
        object.Label_id,
        object.Created_date,
        object.Updated_date,
        object.Status
      ];
    });

    //DELETE ROWS FROM EXISTING TEMPLATE
    this.deleteRows(languageSheet);
    this.deleteRows(pageSheet);
    this.deleteRows(labelSheet);
    this.deleteRows(pagemapSheet);

    const alphabets = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
    ];

    for (let i = 2, k = 0; k < result1.length; i++, k++) {
      for (let j = 0; j < result1[0].length; j++) {
        let attribute = alphabets[j] + i;
        languageSheet.getCell(attribute).value = result1[k][j];
      }
    }

    for (let i = 2, k = 0; k < result2.length; i++, k++) {
      for (let j = 0; j < result2[0].length; j++) {
        let attribute = alphabets[j] + i;
        pageSheet.getCell(attribute).value = result2[k][j];
      }
    }

    for (let i = 2, k = 0; k < result3.length; i++, k++) {
      for (let j = 0; j < result3[0].length; j++) {
        let attribute = alphabets[j] + i;
        labelSheet.getCell(attribute).value = result3[k][j];
      }
    }

    for (let i = 2, k = 0; k < result4.length; i++, k++) {
      for (let j = 0; j < result4[0].length; j++) {
        let attribute = alphabets[j] + i;
        pagemapSheet.getCell(attribute).value = result4[k][j];
      }
    }

    return workbook.xlsx.writeFile("./Template.xlsx");
  } catch (err) {
    console.log("Error in services: ", err);
    return { Success: false, Error: err };
  }
};
