let options = document.querySelector("#page");
fetch("/locale/getTranslations?page_id=4").then((res) => {
  res.json.then((data) => {
    let pages = data.page_name;
  });
});
let array = ["Login", "Dashboard", "Signup", "Preview"];

//Create and append the options
for (let i = 0; i < array.length; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.text = array[i];
  options.appendChild(option);
}
