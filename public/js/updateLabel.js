let options = document.querySelector("#page");

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
