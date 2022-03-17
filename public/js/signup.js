fetch("http://localhost:3000/locale/getTranslations?page_id=2").then((res) => {
  res.json().then((data) => {
    console.log(data);
    document.querySelector("#userDatabase").innerHTML =
      data.PageLabels.userDatabase;
    document.querySelector("#login").innerHTML = data.PageLabels.login;
    document.querySelector("#signUp").innerHTML = data.PageLabels.signUp;
    document.querySelector("#firstName").innerHTML = data.PageLabels.firstName;
    document.querySelector("#lastName").innerHTML = data.PageLabels.lastName;
    document.querySelector("#email").innerHTML = data.PageLabels.email;
    document.querySelector("#userName").innerHTML = data.PageLabels.userName;
    document.querySelector("#password").innerHTML = data.PageLabels.password;
    document.querySelector("#register").innerHTML = data.PageLabels.signUp;
  });
});
