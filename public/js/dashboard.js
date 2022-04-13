// fetch("http://localhost:3000/locale/getTranslations?page_id=3").then((res) => {
//   res.json().then((data) => {
//     // console.log(data.data);
//     // if (data.data.length > 0) {
//     //   var temp = "";
//     //   data.data.forEach((itemData) => {
//     //     temp += "<tr>";
//     //     temp += "<td>" + itemData.id + "</td>";
//     //     temp += "<td>" + itemData.employee_name + "</td>";
//     //     temp += "<td>" + itemData.employee_salary + "</td>";
//     //     // temp += "<td>" + itemData.userName + "</td>";
//     //     // temp += "<td>" + itemData.email + "</td>";
//     //     temp += "<td>" + itemData.firstName + "</td>";
//     //     temp += "<td>" + itemData.lastName + "</td></tr>";
//     //   });
//     //   document.getElementById("data").innerHTML = temp;
//     document.querySelector("#userDatabase").innerHTML =
//       data.PageLabels.userDatabase;
//     document.querySelector("#logout").innerHTML = data.PageLabels.logout;
//     document.querySelector("#id").innerHTML = data.PageLabels.id;
//     document.querySelector("#userName").innerHTML = data.PageLabels.userName;
//     document.querySelector("#email").innerHTML = data.PageLabels.email;
//     document.querySelector("#firstName").innerHTML = data.PageLabels.firstName;
//     document.querySelector("#lastName").innerHTML = data.PageLabels.lastName;
//     document.querySelector("#welcome").innerHTML = data.PageLabels.welcome;
//     // }
//   });
// });

fetch("http://localhost:3000/locale/getTranslations?page_id=1").then((res) => {
  res.json().then((data) => {
    let translations = data.PageLabels;
    console.log(translations);
    let translationsArr = Object.values(translations);
    if (translationsArr !== undefined) {
      document.querySelector("#userDatabase").innerHTML =
        data.PageLabels.userDatabase;
    //   document.querySelector("#logout").innerHTML = data.PageLabels.logout;
    //   document.querySelector("#message").innerHTML = data.PageLabels.message;
    //   document.querySelector("#newLanguage").innerHTML =
    //     data.PageLabels.newLanguage;
    //   document.querySelector("#newPage").innerHTML = data.PageLabels.newPage;
    //   document.querySelector("#newLabel").innerHTML = data.PageLabels.newLabel;
    //   document.querySelector("#updateLabel").innerHTML =
    //     data.PageLabels.updateLabel;
    //   document.querySelector("#fullTemplate").innerHTML =
    //     data.PageLabels.fullTemplate;
    //   document.querySelector("#downloadTemplates").innerHTML =
    //     data.PageLabels.downloadTemplates;
    //   document.querySelector("#completeUpload").innerHTML =
    //     data.PageLabels.completeUpload;
    }
  });
});
