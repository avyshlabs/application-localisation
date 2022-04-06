let options = document.querySelector("#page");
let downloadBtn = document.querySelector("#download-btn");

fetch("/page/getPages").then((res) => {
  res.json().then((data) => {
    let pages = data.pages;
    console.log(data.pages[0].Page_name);
    for (let i = 0; i < pages.length; i++) {
      let option = document.createElement("option");
      option.value = pages[i].Page_id;
      option.text = pages[i].Page_name;
      options.appendChild(option);
    }
  });
});

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let option = options[options.selectedIndex].value;
  console.log(option);
  let url = `/excel/download-afterLanguage?pageId=${option}`;
  axios
    .get(url)
    .then((response) => {
      console.log(response);
      console.log(url);
    })
    .catch((error) => console.error(error));
});
