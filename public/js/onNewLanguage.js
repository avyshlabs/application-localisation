let options = document.querySelector("#language");
let downloadBtn = document.querySelector("#download-btn");

fetch("/language/getAll").then((res) => {
  res.json().then((data) => {
    console.log(data);
    let languages = data.Language;
    // console.log(data.pages[0].Page_name);
    for (let i = 0; i < languages.length; i++) {
      let option = document.createElement("option");
      option.value = languages[i].Language_id;
      option.text = languages[i].Language_name;
      options.appendChild(option);
    }
  });
});

downloadBtn.addEventListener("click", (e) => {
  let option = options[options.selectedIndex].value;
  console.log(option);
  let url = `/excel/download-onNewLanguage?language_id=${option}`;
  console.log(url);
  document.formAction.action = url;
});
