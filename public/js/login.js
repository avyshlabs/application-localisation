fetch("URL").then((res) => {
  res.json().then((data) => {
    document.querySelector("#userDatabase").innerHTML =
      data.context.userDatabase;
    document.querySelector("#signUp").innerHTML = data.context.signUp;
    document.querySelector("#userName").innerHTML = data.context.userName;
    document.querySelector("#password").innerHTML = data.context.password;
    document.querySelector("#submit").innerHTML = data.context.signIn;
  });
});
