"use strict";

const moviePosters = () => {
    let loader = `<div class="loading"><img src="img/download.png" alt="loading image"></div>`;
    $("#container").html(loader);
    fetch("https://pricey-humdrum-beard.glitch.me/movies")
        .then(resp => resp.json())
        .then(movies => {
            let htmlStr = "";
            for (let movie of movies) {

                let title = movie.title.split("");
                title[0] = title[0].toUpperCase();
                title = title.join("");

                htmlStr += `<div class="posters">`
                htmlStr += `<h1 class="title">${title}</h1><div class="genre">${movie.genre}</div><img src=${movie.poster}>`;
                htmlStr += `<div class="underImgContainer"><div class="rating">${movie.rating}/5</div><div class="director">By: ${movie.director}</div></div>`;
                htmlStr += `<div class="description">${movie.plot}</div>`;
                htmlStr += `</div>`;
            }
            $("#container").html(htmlStr);
        });
}
moviePosters();



