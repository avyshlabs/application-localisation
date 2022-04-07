$("#excelFile").change(function () {
  var i = $(this).prev("label").clone();
  var file = $("#excelFile")[0].files[0].name;
  $(this).prev("label").text(file);
});

let options = document.querySelector("#page");

const excelFile = document.getElementById("excelFile");
let heading = document.querySelector(".heading");

excelFile.addEventListener("change", (event) => {
  if (
    ![
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ].includes(event.target.files[0].type)
  ) {
    document.getElementById("excel_data").innerHTML =
      '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';

    excelFile.value = "";

    return false;
  }

  var reader = new FileReader();

  reader.readAsArrayBuffer(event.target.files[0]);

  reader.onload = function (event) {
    var data = new Uint8Array(reader.result);

    var work_book = XLSX.read(data, { type: "array" });

    var sheet_name = work_book.SheetNames;

    var language_data = XLSX.utils.sheet_to_json(
      work_book.Sheets[sheet_name[0]],
      {
        header: 1,
      }
    );
    var label_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[1]], {
      header: 1,
    });

    if (language_data.length > 0) {
      var table_output =
        ' <h2 class="heading">Language Table</h2><table class="table table-striped table-bordered">';

      for (var row = 0; row < language_data.length; row++) {
        table_output += "<tr>";

        for (var cell = 0; cell < language_data[row].length; cell++) {
          if (row == 0) {
            table_output += "<th>" + language_data[row][cell] + "</th>";
          } else {
            table_output += "<td>" + language_data[row][cell] + "</td>";
          }
        }

        table_output += "</tr>";
      }

      table_output += "</table>";

      document.getElementById("excel_data").innerHTML = table_output;
    }

    if (label_data.length > 0) {
      var table_output =
        ' <h2 class="heading">Label Table</h2><table class="table table-striped table-bordered">';

      for (var row = 0; row < label_data.length; row++) {
        table_output += "<tr>";

        for (var cell = 0; cell < label_data[row].length; cell++) {
          if (row == 0) {
            table_output += "<th>" + label_data[row][cell] + "</th>";
          } else {
            table_output += "<td>" + label_data[row][cell] + "</td>";
          }
        }

        table_output += "</tr>";
      }

      table_output += "</table>";

      document.getElementById("excel_data2").innerHTML = table_output;
    }
  };
});

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
