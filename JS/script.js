const body = document.querySelector(".body");
const row = document.querySelector(".row");

function loadTable() {
  fetch("includes/data.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      console.log(data[0].city);

      if (data["empty"]) {
        row.innerHTML = `<h1> NO Data found! </h1>`;
      } else {
        var tr = "";
        for (var i in data) {
          tr += `
          <tr>
          <td>${data[i].city}</td>
          <td>${data[i].temperature}</td>
          <td>${data[i].description}</td>
          <td>${data[i].current_day_and_date}</td>
          <td>${data[i].pressure}</td>
          <td>${data[i].wind_speed}</td>
          <td>${data[i].humidity}</td>
      </tr>
        `;
        }
        row.innerHTML = tr;
      }
    })
    .catch((error) => {
      console.error("Error fetching data1:", error);
    });
}

function loadTempTable() {
  fetch("includes/tempdata.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      console.log(data[0].city);

      if (data["empty"]) {
        body.innerHTML = `<h1> NO Data found! </h1>`;
      } else {
        var tr = "";
        for (var i in data) {
          tr += `
          <tr>
          <td>${data[i].city}</td>
          <td>${data[i].temperature}</td>
          <td>${data[i].description}</td>
          <td>${data[i].current_day_and_date}</td>
          <td>${data[i].pressure}</td>
          <td>${data[i].wind_speed}</td>
          <td>${data[i].humidity}</td>
      </tr>
        `;
        }
        row.innerHTML = tr;
      }
    })
    .catch((error) => {
      console.error("Error fetching data2:", error);
    });
}

// loadTable();

document
  .querySelector("#date-history-btn")
  .addEventListener("click", loadTable);
document
  .querySelector("#temp-history-btn")
  .addEventListener("click", loadTempTable);

loadTable();
