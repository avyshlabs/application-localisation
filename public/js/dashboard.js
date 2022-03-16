fetch("http://dummy.restapiexample.com/api/v1/employees").then((res) => {
  res.json().then((data) => {
    console.log(data.data);
    if (data.data.length > 0) {
      var temp = "";
      data.data.forEach((itemData) => {
        temp += "<tr>";
        temp += "<td>" + itemData.id + "</td>";
        temp += "<td>" + itemData.employee_name + "</td>";
        temp += "<td>" + itemData.employee_salary + "</td>";
        // temp += "<td>" + itemData.userName + "</td>";
        // temp += "<td>" + itemData.email + "</td>";
        temp += "<td>" + itemData.firstName + "</td>";
        temp += "<td>" + itemData.lastName + "</td></tr>";
      });
      //   document.getElementById("data").innerHTML = temp;
      document.querySelector("#userDatabase").innerHTML =
        data.context.userDatabase;
      document.querySelector("#logout").innerHTML = data.context.logout;
      document.querySelector("#id").innerHTML = data.context.id;
      document.querySelector("#userName").innerHTML = data.context.userName;
      document.querySelector("#email").innerHTML = data.context.email;
      document.querySelector("#firstName").innerHTML = data.context.firstName;
      document.querySelector("#lastName").innerHTML = data.context.lastName;
    }
  });
});
