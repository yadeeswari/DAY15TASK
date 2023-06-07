
let data = [];

function createTable() {
  const tableContainer = document.getElementById("table-container");
  
  // Clear existing table
  tableContainer.innerHTML = "";
  
  // Create table element
  let table = document.createElement("table");
  
  // Create table header
  let tableHeader = document.createElement("tr");
  let headers = ["First Name", "Last Name", "Address", "Pincode", "Gender", "Choice of Food", "State", "Country"];
  
  headers.forEach(header => {
    let th = document.createElement("th");
    th.textContent = header;
    tableHeader.appendChild(th);
  });
  
  table.appendChild(tableHeader);
  
  // Create table rows and cells
  data.forEach(item => {
    let row = document.createElement("tr");
    let { firstname, lastname, address, pincode, gender, food, state, country } = item;
    
    let cells = [firstname, lastname, address, pincode, gender, food.join(", "), state, country];
    
    cells.forEach(cellValue => {
      let cell = document.createElement("td");
      cell.textContent = cellValue;
      row.appendChild(cell);
    });
    
    table.appendChild(row);
  });
  
  // Append the table to the container
  tableContainer.appendChild(table);
}

function addData(event) {
  event.preventDefault();
  
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let address = document.getElementById("address").value;
  let pincode = document.getElementById("pincode").value;
  let gender = document.getElementById("gender").value;
  let food = Array.from(document.querySelectorAll('input[name="food"]:checked')).map(checkbox => checkbox.value);
  let state = document.getElementById("state").value;
 let country = document.getElementById("country").value;
  
  let newData = {
    firstname,
    lastname,
    address,
    pincode,
    gender,
    food,
    state,
    country
  };
  
  data.push(newData);
  
  createTable();
  
  // Reset form fields
  document.getElementById("data-form").reset();
}

// Add form submit event listener
document.getElementById("data-form").addEventListener("submit", addData);