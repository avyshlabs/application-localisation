fetch("http://localhost:3000/locale/getTranslations?page_id=1").then((res) => {
  res.json().then((data) => {
    console.log(data);
    document.querySelector("#userDatabase").innerHTML =
      data.PageLabels.userDatabase;
    document.querySelector("#signUp").innerHTML = data.PageLabels.signUp;
    document.querySelector("#userName").innerHTML = data.PageLabels.userName;
    document.querySelector("#password").innerHTML = data.PageLabels.password;
    document.querySelector("#submit").innerHTML = data.PageLabels.signIn;
    document.querySelector("#signIn").innerHTML = data.PageLabels.signIn;
    // if (data.PageLabels.signIns) {
    //   document.querySelector("#signIn").innerHTML = data.PageLabels.signIns;
    // } else {
    //   document.querySelector("#signIn").innerHTML = "hello";
    // }
  });
});
