// <----------------BUTTONS------------->
let languageBtn = document.querySelector("#language-btn");
let pageBtn = document.querySelector("#page-btn");
let labelBtn = document.querySelector("#label-btn");
let pageMapBtn = document.querySelector("#page-map-btn");

// <----------------TABLES------------->
let languageTable = document.querySelector(".language-table");
let pageTable = document.querySelector(".page-table");
let labelTable = document.querySelector(".label-table");
let pageMapTable = document.querySelector(".page-map-table");

//<----------------FUNCTIONS----------->
function showLanguage() {
  if (languageTable.style.display === "block") {
    languageBtn.style.backgroundColor = "#499e9e";
    languageTable.style.display = "none";
  } else {
    languageBtn.style.backgroundColor = "#61cbcb";
    languageTable.style.display = "block";
  }
}
function showPage() {
  if (pageTable.style.display === "block") {
    pageBtn.style.backgroundColor = "#499e9e";

    pageTable.style.display = "none";
  } else {
    pageBtn.style.backgroundColor = "#61cbcb";
    pageTable.style.display = "block";
  }
}
function showLabel() {
  console.log(labelTable.style.display);
  if (labelTable.style.display === "block") {
    labelBtn.style.backgroundColor = "#499e9e";
    labelTable.style.display = "none";
  } else {
    labelBtn.style.backgroundColor = "#61cbcb";
    labelTable.style.display = "block";
  }
}
function showPageMap() {
  console.log(pageMapTable.style.display);
  if (pageMapTable.style.display === "block") {
    pageMapBtn.style.backgroundColor = "#499e9e";
    pageMapTable.style.display = "none";
  } else {
    pageMapBtn.style.backgroundColor = "#61cbcb";
    pageMapTable.style.display = "block";
  }
}
