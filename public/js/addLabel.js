let options = document.querySelector("#page");
//Create array of options to be added
let array = ["Login", "Dashboard", "Signup", "Preview"];

//Create and append the options
for (let i = 0; i < array.length; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.text = array[i];
  options.appendChild(option);
}
