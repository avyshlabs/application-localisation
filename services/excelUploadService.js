const excel = require("exceljs");

const languageService = require("./languageService");
const pageService = require("./PageService");
const labelService = require("./LabelService");
const pageLabelService = require("./PageLabelService");
const translationService = require("./translationService");

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
    await workbook.xlsx.readFile(`${__dirname}/../uploads/template.xlsx`);

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
      { header: "Status", key: "Status", width: 20 },
    ];

    pageSheet.columns = [
      { header: "Page_id", key: "Page_id", width: 18 },
      { header: "Page_name", key: "Page_name", width: 20 },
      { header: "Created_date", key: "Created_date", width: 28 },
      { header: "Updated_date", key: "Updated_date", width: 28 },
      { header: "Status", key: "Status", width: 20 },
    ];

    pagemapSheet.columns = [
      { header: "Page_map_id", key: "Page_map_id", width: 20 },
      { header: "Page_id", key: "Page_id", width: 18 },
      { header: "Label_id", key: "Label_id", width: 18 },
      { header: "Created_date", key: "Created_date", width: 28 },
      { header: "Updated_date", key: "Updated_date", width: 28 },
      { header: "Status", key: "Status", width: 20 },
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
        object.Status,
      ];
    });

    let result2 = page.map((object) => {
      return [
        object.Page_id,
        object.Page_name,
        object.Created_date,
        object.Updated_date,
        object.Status,
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
        object.Status,
      ];
    });

    let result4 = pageMap.map((object) => {
      return [
        object.Page_map_id,
        object.Page_id,
        object.Label_id,
        object.Created_date,
        object.Updated_date,
        object.Status,
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

exports.exportTemplate = async () => {
  try {
    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/addLabels.xlsx`);

    let languageSheet = workbook.getWorksheet("Language");
    let labelSheet = workbook.getWorksheet("Label");

    //SET COLUMN WIDTH, HEADERS AND KEYS
    languageSheet.columns = [
      { header: "Language_id", key: "Language_id", width: 18 },
      { header: "Language_name", key: "Language_name", width: 20 },
      { header: "Language_code", key: "Language_code", width: 28 },
    ];

    labelSheet.columns = [
      { header: "Label_name", key: "Label_name", width: 28 },
      { header: "Label_value", key: "Label_value", width: 28 },
      { header: "Language_id", key: "Language_id", width: 28 },
    ];

    //GET EXISTING DATA FROM DATABASE
    let languages = await languageService.getAll();

    //RETRIEVE THE SPECIFIC DATA
    let language = languages.Language;

    //CREATE ARRAYS OF ARRAY OF DATA
    let langCodes = language.map((object) => {
      let str = object.Language_id + " " + object.Language_name;
      return String(str);
    });

    let c = 0;
    let result1 = language.map((object) => {
      return [object.Language_id, object.Language_name, langCodes[c++]];
    });

    //DELETE ROWS FROM EXISTING TEMPLATE
    this.deleteRows(languageSheet);

    const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L"];

    for (let i = 2, k = 0; k < result1.length; i++, k++) {
      for (let j = 0; j < result1[0].length; j++) {
        let attribute = alphabets[j] + i;
        languageSheet.getCell(attribute).value = result1[k][j];
      }
    }

    return workbook.xlsx.writeFile(`${__dirname}/../uploads/addLabels.xlsx`);
  } catch (err) {
    console.log("Error in services: ", err);
    return { Success: false, Error: err };
  }
};

exports.updateTemplate = async () => {
  try {
    let workbook = new excel.Workbook();

    let columns = [
        { header: 'Translation_id', key: 'Translation_id', width: 20 },
        { header: "Label_name", key: "Label_name", width: 28 },
        { header: "Translation_value", key: "Translation_value", width: 28 },
        { header: "Language", key: "Language", width: 28 },
        { header: "Status", key: "Status", width: 20 }
    ]

    workbook.addWorksheet('Update_Labels');
    let sheet = workbook.getWorksheet('Update_Labels');
    sheet.columns = columns

    //GET EXISTING DATA FROM DATABASE
    let translations = await translationService.getTranslations();

    //RETRIEVE THE SPECIFIC DATA
    let translation = translations.Translation;

    let array = translation.map((object)=> {
      let language = object.Language;
      let language_string = language.Language_code + " " + language.Language_name;
      return [
        object.Translation_id,
        object.Label.Label_name,
        object.Translation_value,
        language_string,
        object.Status
      ]
    });

    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let row = 2;
    let column = 0;

    //ADDING DATA INTO EXCEL WORKSHEET
    for(let i=0; i<array.length; i++){
      for(let j=0; j<array[0].length; j++){
        let attribute = alphabets[j] + row;
        sheet
      }
    }

    return workbook.xlsx.writeFile(`${__dirname}/../uploads/writeTemplate.xlsx`);
  
  } catch (err) {
    console.log("Error in services: ", err);
    return { Success: false, Error: err.message };
  }
};

exports.exportTemplate = async (pageId) => {
  try {
    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/addLabels.xlsx`);

    let languageSheet = workbook.getWorksheet("Language");
    let labelSheet = workbook.getWorksheet("Label");

    //SET COLUMN WIDTH, HEADERS AND KEYS
    languageSheet.columns = [
      { header: "Language_id", key: "Language_id", width: 18 },
      { header: "Language_name", key: "Language_name", width: 20 },
      { header: "Language_code", key: "Language_code", width: 28 },
    ];

    labelSheet.columns = [
      { header: "Label_name", key: "Label_name", width: 28 },
      { header: "Label_value", key: "Label_value", width: 28 },
      { header: "Language_id", key: "Language_id", width: 28 },
    ];

    //GET EXISTING DATA FROM DATABASE
    let languages = await languageService.getAll();

    //RETRIEVE THE SPECIFIC DATA
    let language = languages.Language;

    //CREATE ARRAYS OF ARRAY OF DATA
    let langCodes = language.map((object) => {
      let str = object.Language_id + " " + object.Language_name;
      return String(str);
    });

    let c = 0;
    let result1 = language.map((object) => {
      return [object.Language_id, object.Language_name, langCodes[c++]];
    });

    //DELETE ROWS FROM EXISTING TEMPLATE
    this.deleteRows(languageSheet);
    this.deleteRows(labelSheet);

    const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L"];

    for (let i = 2, k = 0; k < result1.length; i++, k++) {
      for (let j = 0; j < result1[0].length; j++) {
        let attribute = alphabets[j] + i;
        languageSheet.getCell(attribute).value = result1[k][j];
      }
    }

    if (pageId != undefined) {
      let labels = await pageLabelService.getAllDistinct(pageId);
      let label = labels.Label;
      console.log("=------------------------> Label");
      console.log(label);

      let result2 = label.map((object) => {
        console.log(object.Label.Label_name);
        return [object.Label.Label_name];
      });

      for (let i = 2, k = 0; k < result2.length; i++, k++) {
        for (let j = 0; j < result2[0].length; j++) {
          let attribute = alphabets[j] + i;
          labelSheet.getCell(attribute).value = result2[k][j];
        }
      }
    }

    return workbook.xlsx.writeFile(`${__dirname}/../uploads/addLabels.xlsx`);
  } catch (err) {
    console.log("Error in services: ", err);
    return { Success: false, Error: err };
  }
};

exports.addLabelFromExcel = async (worksheets, Page_id) => {
  try {
    console.log(
      `inside excelUploadService- addLabelFromEXcel Service, pageId = ${Page_id}`
    );
    if (worksheets.Label === undefined) {
      throw new Error("all tables must be there in the excel file");
    }

    return sequelize
      .transaction(async (t) => {
        for (const labelObj of worksheets.Label) {
          let result = await labelService.getLabelByValue(labelObj.Label_value);
          if (result.Success) {
            let pageLabelSaveResult = await pageLabelService.createPageLabel(
              { page: Page_id, label: result.Label.Label_id },
              t
            );
            if (!pageLabelSaveResult.Success) throw new Error();
          } else {
            let saveResult = await labelService.createLabel(
              {
                label_name: labelObj.Label_name,
                label_value: labelObj.Label_value,
                language_id: labelObj.Language_id.substring(
                  0,
                  labelObj.Language_id.indexOf(" ")
                ),
              },
              t
            );
            if (!saveResult.Success) throw new Error();
            let pageLabelSaveResult = await pageLabelService.createPageLabel(
              { page: Page_id, label: saveResult.Content.Label_id },
              t
            );
            if (!pageLabelSaveResult.Success) throw new Error();
          }
        }
      })
      .then(async (result) => {
        console.log(`----------------------------->adding labels committed`);
      })
      .catch(function (err) {
        console.log("------------------------------>adding labels Rolled back");
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.afterLanguage = async () => {
  try {
    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/afterLanguage.xlsx`);

    let labelSheet = workbook.getWorksheet("Label");

    //SET COLUMN WIDTH, HEADERS AND KEYS
    labelSheet.columns = [
      { header: "Label_name", key: "Label_name", width: 28 },
      { header: "Label_value", key: "Label_value", width: 28 },
    ];

    //DELETE ROWS FROM EXISTING TEMPLATE
    this.deleteRows(labelSheet);

    //GET ALL LABELS
    let labels = await labelService.getAllDistinct(pageId);

    //SPECIFIC DATA
    let label = labels.Label;

    //ARRAY OF ARRAY OF DATA
    let result1 = label.map((object) => {
      return [object.Label_name];
    });

    const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L"];

    for (let i = 2, k = 0; k < result1.length; i++, k++) {
      for (let j = 0; j < result1[0].length; j++) {
        let attribute = alphabets[j] + i;
        labelSheet.getCell(attribute).value = result1[k][j];
      }
    }

    return workbook.xlsx.writeFile(
      `${__dirname}/../uploads/afterLanguage.xlsx`
    );
  } catch (err) {
    console.log("Error in services: ", err);
    return { Success: false, Error: err };
  }
};
exports.updateLabelFromExcel = async (worksheets) => {
  try {
    if (worksheets.Update_Label === undefined) {
      throw new Error("Label sheet is not present in the excel file");
    }

    return sequelize
      .transaction(async (t) => {
        for (const translationObj of worksheets.Update_Label) {
          let updateResult = await translationService.updateTranslation(
            translationObj,
            t
          );
          if (!updateResult.Success) throw new Error();
        }
      })
      .then(async (result) => {
        console.log(`----------------------------->update labels committed`);
      })
      .catch(function (err) {
        console.log("------------------------------>update labels Rolled back");
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.allPages = async () => {
  try {
    let workbook = new excel.Workbook();
    let pages = await pageService.getAll();

    //ARRAY OF PAGE NUMBERS
    let pageNos = pages.Page.map((object) => {
      return object.Page_id;
    });

    //ARRAY OF PAGENAMES FOR SHEETS
    let allPages = pages.Page.map((page) => {
      let pageName = page.Page_id + " " + page.Page_name;
      workbook.addWorksheet(pageName);
      return pageName;
    });

    //ARRAY OF SHEETS
    let sheets = allPages.map((page) => {
      workbook.getWorksheet(page).state = "visible";
      return workbook.getWorksheet(page);
    });

    //ARRAY OF LANGUAGES FOR FORMULA
    let languages = await languageService.getAll();
    let language = languages.Language.map((object) => {
      return object.Language_id + " " + object.Language_name;
    });

    //FORMULA SHOULD BE OF THE FORM
    //[‘“One,Two,Three,Four”’]

    let formula = '"' + language.join(",") + '"';

    //SHEETS INITIAL SETUP INCLUDING STYLING, COLUMNS AND DATA VALIDATIONS
    sheets.map((sheet) => {
      sheet.columns = [
        { header: "Label_name", key: "Label_name", width: 28, height: 25 },
        { header: "Label_value", key: "Label_value", width: 28, height: 25 },
        { header: "Language_id", key: "Language_id", width: 28, height: 25 },
      ];

      sheet.eachRow((row, rowNumber) => {
        row.font = { size: 15, family: 4 };
        row.eachCell((col, colNumber) => {
          col.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "#B0E0E6" },
          };
        });
        row.commit();
      });

      //ADDING DATA VALIDATIONS
      for (let i = 2; i <= 500; i++) {
        let cell = "C" + i;
        sheet.getCell(cell).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: [formula],
        };
      }
    });

    return workbook.xlsx.writeFile(`${__dirname}/../uploads/allPages.xlsx`);
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err.message };
  }
};

exports.addData = async () => {
  try {
    let workbook = new excel.Workbook();
    await workbook.xlsx.readFile(`${__dirname}/../uploads/allPages.xlsx`);

    let pages = await pageService.getAll();

    //ARRAY OF PAGE NUMBERS
    let pageNos = pages.Page.map((object) => {
      return object.Page_id;
    });

    //ARRAY OF PAGENAMES FOR SHEETS
    let allPages = pages.Page.map((page) => {
      let pageName = page.Page_id + " " + page.Page_name;
      return pageName;
    });

    let sheets = await allPages.map((page) => {
      return workbook.getWorksheet(page);
    });

    console.log(pageNos);
    sheets.map((sheet) => console.log(sheet.name));

    //POPULATE THE EXCEL WITH EXISTING DISTINCT DATA FROM DATABASE
    let row = 2;

    for (let i = 0; i < sheets.length; i++) {
      let pageId = pageNos[i];
      let labels = await pageLabelService.getAllDistinct(pageId);
      let label = labels.Label;

      let result = label.map((object) => {
        return object.Label.Label_name;
      });

      for (let j = 0; j < result.length; j++) {
        let attribute = "A" + row++;
        sheets[i].getCell(attribute).value = result[j];
      }
      console.log(sheets[i].name);
      console.log(result);
      row = 2;
    }

    await workbook.xlsx.writeFile(`${__dirname}/../uploads/allPages.xlsx`);
    return workbook;
  } catch (err) {
    console.log(err);
  }
};

exports.addLabelsForNewLanguage = async (worksheets) => {
  try {
    console.log("inside excelUploadService- addLabelsForNewLanguage Service");

    for (const property in worksheets) {
      console.log("sheet Name", property);
      return sequelize
        .transaction(async (t) => {
          for (const labelObj of worksheets[property]) {
            let result = await labelService.getLabelByValue(
              labelObj.Label_value
            );
            if (result.Success) {
              let pageLabelSaveResult = await pageLabelService.createPageLabel(
                { page: property, label: result.Label.Label_id },
                t
              );
              if (!pageLabelSaveResult.Success) throw new Error();
            } else {
              let saveResult = await labelService.createLabel(
                {
                  label_name: labelObj.Label_name,
                  label_value: labelObj.Label_value,
                  language_id: labelObj.Language_id.substring(
                    0,
                    labelObj.Language_id.indexOf(" ")
                  ),
                },
                t
              );
              if (!saveResult.Success) throw new Error();
              let pageLabelSaveResult = await pageLabelService.createPageLabel(
                { page: property, label: saveResult.Content.Label_id },
                t
              );
              if (!pageLabelSaveResult.Success) throw new Error();
            }
          }
        })
        .then(async (result) => {
          console.log(
            `----------------------------->adding labels and page map for pageId = ${property} committed`
          );
        })
        .catch(function (err) {
          console.log(
            `------------------------------>adding labels for pageId = ${property} Rolled back`
          );
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addLabelsForNewLanguage2 = async (worksheet, languageId) => {
  try {
    console.log("inside excelUploadService- addLabelsForNewLanguage2 Service");
    return sequelize
      .transaction(async (t) => {
        for (const labelObj of worksheet[languageId]) {
          let translationSaveResult = await translationService.saveTranslation(
            labelObj.Label_id,
            languageId,
            labelObj.Translation_value,
            t
          );
          if (!translationSaveResult.Success) throw new Error();
        }
      })
      .then((result) => {
        console.log(
          `---------------------->adding labels for new language commited`
        );
        return { Success: true };
      })
      .catch((err) => {
        console.log(
          `---------------------->adding labels for new language rolled back`
        );
        return { Success: false };
      });
  } catch (err) {
    console.log(err.message);
  }
};
exports.onNewPage = async () => {
  try{
    //CREATE INSTANCE OF EXCEL WORKBOOK
    let workbook = new excel.Workbook();

    //GET ALL LANGUAGES
    let languages = await languageService.getAll();
    let language = languages.Language;

    //EXCEL FILE COLUMN HEADER INITIALISATION
    let columns = [
      { header: "Label_name", key: "Label_name", width: 28 },
    ];

    //ADDING EACH LANGUAGE AS HEADER
    language.map((object)=> {
      let heading = object.Language_id + " " + object.Language_code;
      let record = { header: heading, key: heading, width: 20}
      columns.push(record);
    });


    //ADDING SHEET AND COLUMNS
    workbook.addWorksheet('Add_Labels');
    let sheet = workbook.getWorksheet('Add_Labels');
    sheet.columns = columns;

    console.log("Columns: ", columns);


    return workbook.xlsx.writeFile(`${__dirname}/../uploads/writeTemplate.xlsx`);

  } catch (err) {
    console.log("Error in on-new-page service", err.message);
    return { Success: false, Error: err.message };
  }
};

exports.onNewLanguage = async (languageId) => {
  try {
    //CREATE INSTANCE OF EXCEL WORKBOOK
    let workbook = new excel.Workbook();

    //GET THE LANGUAGE
    let object = await languageService.getLanguageById(languageId);
    let language = object.Language;

    //GET ALL LABELS
    let labels = await labelService.getAll();
    let label = labels.Label;

    //ADDING WORKSHEET
    let sheetName = language.Language_id + " " + language.Language_code;
    workbook.addWorksheet(sheetName);
    let sheet = workbook.getWorksheet(sheetName);

    //EXCEL FILE COLUMN HEADER INITIALISATION
    let columns = [
      { header: "Label_id", key: "Label_id", width: 20 },
      { header: "Label_name", key: "Label_name", width: 28 },
      { header: "Translation_value", key: "Translation_value", width: 28 },
    ];

    sheet.columns = columns;

    //ADDING LABEL_NAME's TO EXCEL SHEET
    let row = 2;
    label.map((object) => {
      let attribute1 = "A" + row;
      let attribute2 = "B" + row;
      sheet.getCell(attribute1).value = object.Label_id;
      sheet.getCell(attribute2).value = object.Label_name;
      row++;
    });

    return workbook.xlsx.writeFile(
      `${__dirname}/../uploads/writeTemplate.xlsx`
    );
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err.message };
  }
};
