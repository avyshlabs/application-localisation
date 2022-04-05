var myParent = document.body;
let options = document.querySelector(".options");
//Create array of options to be added
var array = ["Volvo", "Saab", "Mercades", "Audi"];

//Create and append select list
var selectList = document.createElement("select");
selectList.id = "mySelect";
myParent.appendChild(selectList);

//Create and append the options
for (var i = 0; i < array.length; i++) {
  var option = document.createElement("option");
  option.value = array[i];
  option.text = array[i];
  selectList.appendChild(option);
}
