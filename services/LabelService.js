const Label = require("../DAO/LabelDAO");

exports.getLabelById = async (id) => {
  try {
    let label = await Label.getLabelById(id);
    return label;
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

// exports.createLabel = async(content)=> {
//     try{
//         let label = await Label.createLabel(content);
//         return label;
//     }catch(err){
//         return {Success: false, Error: err};
//     }
// }

//updated with transaction
exports.createLabel = async (content, transaction) => {
  try {
    let label = await Label.createLabel(content, transaction);
    return label;
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.getAll = async () => {
  try {
    let label = await Label.getAll();
    if (label.Success) return label;
    else return { Success: false, Error: "Error in services" };
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.update = async (labelId, details,transaction) => {
  try {
    let toUpdate = {
      Label_name: details.Label_name,
      Label_value: details.Label_value,
      Language_id: details.Language_id,
      Status: details.Status,
      Updated_date: new Date(),
    };
    let label = await Label.update(labelId, toUpdate,transaction);
    return label;
  } catch (err) {
    return { Success: false, Error: err };
  }
};
