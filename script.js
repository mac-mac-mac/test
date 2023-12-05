function searchShow(query) {
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;
    fetch(url)
    .then(response => response.json())
    .then((jsonData) => {
        const results = new Map(Object.entries(jsonData));
        console.log(results)
        renderResults(results);
        document.getElementById("errorMessage").innerHTML = "";
    })
    .catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
        renderResults([]);
    });
}

function renderResults(results) {
    const list = document.getElementById("resultsList");
    list.innerHTML = "";
    results.forEach(result => {
        const element = document.createElement("li");
        element.innerHTML = element.innerHTML + "<h3><b>" + result.show.name + "</b></h3>";
        element.innerHTML = element.innerHTML + "<i>(Premiered " + result.show.premiered + ") </i><br>";
        element.innerHTML = element.innerHTML + "Genres: " + result.show.genres;
        list.appendChild(element);
    });
}

let searchTimeoutToken = 0;

window.onload = () => {
    const searchTitle = document.getElementById("searchTitle");
    searchTitle.onkeyup = (event) =>{
        clearTimeout(searchTimeoutToken);

        if (searchTitle.value.trim().length === 0) {
            return;
        }

        searchTimeoutToken = setTimeout(() => {
            searchShow(searchTitle.value);
        }, 250);
    };
}