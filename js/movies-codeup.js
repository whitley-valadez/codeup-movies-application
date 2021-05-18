"use strict";

const moviePosters = () => {
    let loader = `<div class="loading"><img src="img/download.png" alt="loading image"></div>`;
    $("#container").html(loader);
    fetch("https://pricey-humdrum-beard.glitch.me/movies")
        .then(resp => resp.json())
        .then(movies => {
            let htmlStr = "";
            for (let movie of movies) {
                htmlStr += `<div class="posters">`
                htmlStr += `<h1 class="title">${movie.title}</h1><img src= ${movie.poster}></div>`;
            }
            $("#container").html(htmlStr);
        });
}
moviePosters();