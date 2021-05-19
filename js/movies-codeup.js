"use strict";

$(document).ready(function(){

    const moviePosters = () => {
        let loader = `<div class="loading"><img src="img/loading.gif"></div>`;
        $("#container").html(loader);
        fetch("https://pricey-humdrum-beard.glitch.me/movies")
            .then(resp => resp.json())
            .then(movies => {
                let htmlStr = "";
                for (let movie of movies) {

                    // let title = movie.title.split("");
                    // title[0] = title[0].toUpperCase();
                    // title = title.join("");

                    htmlStr += `<div class="posters">`
                    htmlStr += `<h1 class="title">${movie.title}</h1><div class="genre">${movie.genre}</div><img src=${movie.poster}>`;
                    htmlStr += `<div class="underImgContainer"><div class="rating">${movie.rating}/5</div><div class="director">By: ${movie.director}</div></div>`;
                    htmlStr += `<div class="description">${movie.plot}</div>`;
                    htmlStr += `</div>`;
                }
                console.log(movies)
                $("#container").html(htmlStr);
            });
    }
    moviePosters();

    //create a new movie


    $('#newMovie').click((e) => {
        e.preventDefault();

        var addMovie = {
            title: $("#title").val(),
            genre: $("#genre").val(),
            rating: $("#rating").val(),
            director: $("#director").val(),
            plot: $("#description").val()
        }
        let postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addMovie)
        }

        console.log(addMovie)
        fetch("https://pricey-humdrum-beard.glitch.me/movies", postOptions)
            .then(resp => resp.json())
            .then(moviePosters).catch(error => console.log(error))
    });

    //end of document ready
});