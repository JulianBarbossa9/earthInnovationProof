document.addEventListener("DOMContentLoaded", function () {
  const countryList = document.getElementById("country-list");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");

  const itemsPerPage = 10; // Number of items to display per page
  let currentPage = 1; // Current page

  let data; // Variable to store the fetched data

  // Fetch data from the provided JSON file
  fetch("https://raw.githubusercontent.com/mledoze/countries/master/countries.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
      displayData();
    })
    .catch((error) => console.error("Error fetching data: ", error));

  // Function to display data for the current page
  function displayData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const countriesToDisplay = data.slice(startIndex, endIndex);

    countryList.innerHTML = ""; // Clear the list

    countriesToDisplay.forEach((country) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const capitalCell = document.createElement("td");
      const populationCell = document.createElement("td");
      const languageCell = document.createElement("td");

      nameCell.textContent = country.name.common;
      capitalCell.textContent = country.capital[0];

      // Display population or any other data you want
      populationCell.textContent = country.region;

      // Combine all languages into a single string
      const languages = country.languages ? Object.values(country.languages).join(", ") : "";
      languageCell.textContent = languages;

      row.appendChild(nameCell);
      row.appendChild(capitalCell);
      row.appendChild(populationCell);
      row.appendChild(languageCell);

      countryList.appendChild(row);
    });
  }

  // Function to go to the previous page
  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      displayData();
    }
  }

  // Function to go to the next page
  function goToNextPage() {
    const maxPage = Math.ceil(data.length / itemsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      displayData();
    }
  }

  prevPageButton.addEventListener("click", goToPreviousPage);
  nextPageButton.addEventListener("click", goToNextPage);
});
