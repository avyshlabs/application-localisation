const excel = require("exceljs");

const languageService = require("./languageService");
const labelService = require("./labelService");
const pageLabelService = require("./pageLabelService");
const translationService = require("./translationService");

const sequelize = require("../DAO/database");

//ADD LABELS TO DATABASE FROM EXCEL ON NEW PAGE
exports.addLabelFromExcel2 = async (worksheets, Page_id) => {
  try {
    console.log(
      `inside excelUploadService- addLabelFromEXcel Service, pageId = ${Page_id}`
    );
    if (worksheets.Add_Labels === undefined) {
      throw new Error("all tables must be there in the excel file");
    }

    return sequelize
      .transaction(async (t) => {
        for (const labelObj of worksheets.Add_Labels) {
          console.log("---------------------------service", labelObj);
          let result = await labelService.getLabelByName(labelObj.Label_name);
          if (result.Success) {
            console.log("services-------------------", result.Label.Label_id);
            let Label_id = result.Label.Label_id;
            let labelInPage = await pageLabelService.LabelInPage(
              Page_id,
              Label_id
            );
            console.log(
              "this is PageMap --------------------- ",
              labelInPage.Pagelabels
            );
            if (!labelInPage.Pagelabels) {
              console.log("Label doesnt exist in PageMap");
              let pageLabelSaveResult = await pageLabelService.createPageLabel(
                { page: Page_id, label: result.Label.Label_id },
                t
              );
              if (!pageLabelSaveResult.Success) throw new Error();
            }
          } else {
            let saveLabelResult = await labelService.createLabel(
              {
                label_name: labelObj.Label_name,
              },
              t
            );
            if (!saveLabelResult.Success) throw new Error();
            let pageLabelSaveResult = await pageLabelService.createPageLabel(
              { page: Page_id, label: saveLabelResult.Content.Label_id },
              t
            );
            if (!pageLabelSaveResult.Success) throw new Error();
            console.log("--------------------------------excel service");
            let keysArr = Object.keys(worksheets.Add_Labels);
            let valuesArr = Object.values(worksheets.Add_Labels);
            // console.log(keysArr);
            // let languagesArr = keysArr.shift();
            // let translationsArr = valuesArr.shift();
            // console.log(keysArr);
            // console.log(labelObj);
            let labelArr = Object.keys(labelObj);
            console.log(
              "labelARR--------------------->",
              worksheets.Add_Labels
            );
            console.log("valuesARR--------------------->", valuesArr);
            let lenArr = Object.keys(worksheets.Add_Labels[0]);
            let newArr = Object.keys(worksheets.Add_Labels[0]);
            newArr.shift();
            console.log("keysARR--------------------->", newArr);
            for (let langId of newArr) {
              console.log("labelobj----------", labelObj);
              console.log("worksheet----------", worksheets.Add_Labels);
              console.log("langId----------", langId);
              console.log("labelobj-langID----------", labelObj[langId]);
              let translationResult = await translationService.saveTranslation(
                saveLabelResult.Content.Label_id,
                langId.substring(0, langId.indexOf(" ")),
                labelObj[langId],
                t
              );
              if (!translationResult.Success) throw new Error();
            }
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

//UPDATE LABELS TO DATABASE FROM EXCEL 
exports.updateLabelFromExcel = async (worksheets) => {
  try {
    if (worksheets.Update_Labels === undefined) {
      throw new Error("Label sheet is not present in the excel file");
    }

    return sequelize
      .transaction(async (t) => {
        for (const translationObj of worksheets.Update_Labels) {
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

//ADD LABELS TO DATABASE FROM EXCEL ON NEW LANGUAGE
exports.addLabelsForNewLanguage2 = async (worksheet, languageId) => {
  try {
    console.log("inside excelUploadService- addLabelsForNewLanguage2 Service");
    return sequelize
      .transaction(async (t) => {
        for (const labelObj of worksheet[languageId]) {
          if(labelObj.Label_id === undefined || labelObj.Translation_value === undefined) continue
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

//TEMPLATE FOR ADDING NEW LABELS FOR NEW PAGE
exports.onNewPage = async () => {
  try {
    //CREATE INSTANCE OF EXCEL WORKBOOK
    let workbook = new excel.Workbook();

    //GET ALL LANGUAGES
    let languages = await languageService.getAll();
    let language = languages.Language;

    //EXCEL FILE COLUMN HEADER INITIALISATION
    let columns = [{ header: "Label_name", key: "Label_name", width: 28 }];

    //ADDING EACH LANGUAGE AS HEADER
    language.map((object) => {
      let heading = object.Language_id + " " + object.Language_code;
      let record = { header: heading, key: heading, width: 20 };
      columns.push(record);
    });

    //ADDING SHEET AND COLUMNS
    workbook.addWorksheet("Add_Labels");
    let sheet = workbook.getWorksheet("Add_Labels");
    sheet.columns = columns;

    console.log("Columns: ", columns);

    return workbook.xlsx.writeFile(
      `${__dirname}/../uploads/writeTemplate.xlsx`
    );
  } catch (err) {
    console.log("Error in on-new-page service", err.message);
    return { Success: false, Error: err.message };
  }
};

//TEMPLATE TO UPDATE LABELS 
exports.updateTemplate = async () => {
  try {
    let workbook = new excel.Workbook();

    let columns = [
      { header: "Translation_id", key: "Translation_id", width: 20 },
      { header: "Label_name", key: "Label_name", width: 28 },
      { header: "Translation_value", key: "Translation_value", width: 28 },
      { header: "Language", key: "Language", width: 28 },
      { header: "Status", key: "Status", width: 20 },
    ];

    workbook.addWorksheet("Update_Labels");
    let sheet = workbook.getWorksheet("Update_Labels");
    sheet.columns = columns;

    //GET EXISTING DATA FROM DATABASE
    let translations = await translationService.getTranslations();

    //RETRIEVE THE SPECIFIC DATA
    let translation = translations.Translation;

    let array = translation.map((object) => {
      let language = object.Language;
      let language_string =
        language.Language_code + " " + language.Language_name;
      return [
        object.Translation_id,
        object.Label.Label_name,
        object.Translation_value,
        language_string,
        object.Status,
      ];
    });

    const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let row = 2;
    let column = 0;

    //ADDING DATA INTO EXCEL WORKSHEET
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[0].length; j++) {
        let attribute = alphabets[j] + row;
        sheet.getCell(attribute).value = array[i][j];
      }
      row++;
    }

    return workbook.xlsx.writeFile(
      `${__dirname}/../uploads/writeTemplate.xlsx`
    );
  } catch (err) {
    console.log("Error in services: ", err);
    return { Success: false, Error: err.message };
  }
};

//TEMPLATE FOR ADDING LABELS FOR NEW LANGUAGE
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
