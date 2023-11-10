let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function CreateAndAppend(result) {
    let {
        title,
        link,
        description
    } = result;
    let ResultContainer = document.createElement("div");
    ResultContainer.classList.add("result-item");

    let createTitle = document.createElement("a");
    createTitle.href = link;
    createTitle.target = "_blank";
    createTitle.textContent = title;
    createTitle.classList.add("result-title");
    ResultContainer.appendChild(createTitle);

    let linkBreakEl = document.createElement("br");
    ResultContainer.appendChild(linkBreakEl);

    let createLink = document.createElement("a");
    createLink.href = link;
    createLink.target = "_blank";
    createLink.textContent = link;
    createLink.classList.add("result-url");
    ResultContainer.appendChild(createLink);

    let createdescription = document.createElement("p");
    createdescription.textContent = description;
    createdescription.classList.add("link-description");
    ResultContainer.appendChild(createdescription);

    searchResultsEl.appendChild(ResultContainer);
}

function displayResult(search_results) {
    for (let result of search_results) {
        CreateAndAppend(result);
    }
}
searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        let options = {
            method: "GET"
        };
        spinnerEl.classList.toggle("d-none");
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputEl.value;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinnerEl.classList.toggle("d-none");
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
});
