// import 
// Assuming your JSON data is in a variable
const jsonData = [
  {
    "Name": "John Doe",
    "Age": 28,
    "Email": "john@example.com",
    "Country": "USA"
  },
  {
    "Name": "Jane Smith",
    "Age": 35,
    "Email": "jane@example.com",
    "Country": "Canada"
  },
  {
    "Name": "Alice Johnson",
    "Age": 22,
    "Email": "alice@example.com",
    "Country": "UK"
  },
  {
    "Name": "Valentina Giraldo",
    "Age": 25,
    "Email": "valentina@example.com",
    "Country": "Argentina"
  },
  {
    "Name": "Juan Perez",
    "Age": 55,
    "Email": "juanP@example.com",
    "Country": "Colombia"
  },
  {
    "Name": "Flor Martinez",
    "Age": 44,
    "Email": "flor@example.com",
    "Country": "Brazil"
  },
  {
    "Name": "Diego Garcia",
    "Age": 25,
    "Email": "diego@example.com",
    "Country": "Argentina"
  },
  {
    "Name": "Ana Ramirez",
    "Age": 60,
    "Email": "ana@example.com",
    "Country": "Ecuador"
  },
  {
    "Name": "Luis Calderon",
    "Age": 55,
    "Email": "luis@example.com",
    "Country": "Colombia"
  },
  {
    "Name": "Maria Restrepo",
    "Age": 45,
    "Email": "maria@example.com",
    "Country": "Colombia"
  },
];

const tableBody = document.getElementById("data-table");
const countryFilter = document.getElementById("country-filter");

// Function to populate the country filter based on distinct countries
function populateCountryFilter() {
  const distinctCountries = [...new Set(jsonData.map((data) => data.Country))];
  distinctCountries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countryFilter.appendChild(option);
  });
}

// Function to filter the table based on the input values
function filterTable() {
  const nameFilter = document.getElementById("name-filter").value.toLowerCase();
  const ageFilterMin = document.getElementById("age-filter-min").value;
  const ageFilterMax = document.getElementById("age-filter-max").value;
  const selectedCountry = document.getElementById("country-filter").value;

  // Clear the table before repopulating it
  tableBody.innerHTML = "";

  // Iterate through the JSON data and create rows for the table
  jsonData.forEach((data) => {
    // Check if the data matches the filters
    if ((data.Name.toLowerCase().includes(nameFilter) || nameFilter === "") &&
        (data.Age >= ageFilterMin || ageFilterMin === "") &&
        (data.Age <= ageFilterMax || ageFilterMax === "") &&
        (data.Country === selectedCountry || selectedCountry === "")) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const ageCell = document.createElement("td");
      const emailCell = document.createElement("td");
      const countryCell = document.createElement("td");

      nameCell.textContent = data.Name;
      ageCell.textContent = data.Age;
      emailCell.textContent = data.Email;
      countryCell.textContent = data.Country;

      row.appendChild(nameCell);
      row.appendChild(ageCell);
      row.appendChild(emailCell);
      row.appendChild(countryCell);

      tableBody.appendChild(row);
    }
  });
}

// Add event listeners to the filters
document.getElementById("name-filter").addEventListener("input", filterTable);
document.getElementById("age-filter-min").addEventListener("input", filterTable);
document.getElementById("age-filter-max").addEventListener("input", filterTable);
document.getElementById("country-filter").addEventListener("change", filterTable);

// Populate the country filter and the table on page load
populateCountryFilter();
filterTable();