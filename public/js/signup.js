fetch("URL").then((res) => {
  res.json().then((data) => {
    document.querySelector("#userDatabase").innerHTML =
      data.context.userDatabase;
    document.querySelector("#login").innerHTML = data.context.login;
    document.querySelector("#signUp").innerHTML = data.context.signUp;
    document.querySelector("#firstName").innerHTML = data.context.firstName;
    document.querySelector("#lastName").innerHTML = data.context.lastName;
    document.querySelector("#email").innerHTML = data.context.email;
    document.querySelector("#userName").innerHTML = data.context.userName;
    document.querySelector("#password").innerHTML = data.context.password;
    document.querySelector("#register").innerHTML = data.context.register;
  });
});
