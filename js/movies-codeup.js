"use strict";

$(document).ready(function(){

    let url = "https://shadowed-deciduous-gecko.glitch.me/movies";
    const moviePosters = () => {
        let loader = `<div class="loading"><img src="img/loading.gif"></div>`;
        $("#container").html(loader);
        fetch(url)
            .then(resp => resp.json())
            .then(movies => {
                let htmlStr = "";
                let html = "";
                for (let movie of movies) {

                    // let title = movie.title.split("");
                    // title[0] = title[0].toUpperCase();
                    // title = title.join("");

                    html += `<option value=${movie.id}>${movie.title}</option>`;

                    htmlStr += `<div class="posters"><a href="#1"></a>`
                    htmlStr += `<h1 class="title">${movie.title}</h1><div class="genre">${movie.genre}</div><img src=${movie.poster}>`;
                    htmlStr += `<div class="underImgContainer"><div class="rating">${movie.rating}/5</div><div class="director">By: ${movie.director}</div></div>`;
                    htmlStr += `<div class="description">${movie.plot}</div>`;
                    htmlStr += `</div>`;
                }
                console.log(movies)
                $("#container").html(htmlStr);
                $("#selectMenu").html(html);
            });
    }
    moviePosters();


    $("#selectMenu").change(function(){
        let target = $(this).val()
        console.log(target);
        //show menu and then use targeted fields to PATCH the selected movie with new information
    })


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
        fetch(url, postOptions)
            .then(resp => resp.json())
            .then(moviePosters).catch(error => console.log(error))
    });

    $("#modify").click(function(){



        let insert = {
            "title": "Percy Jackson & The Titans Curse"
        }

        let patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(insert)
        }

        //P
        fetch(`https://shadowed-deciduous-gecko.glitch.me/movies/${userSelectedId}`, patchOptions)
            .then(getBooks);

    });

    //end of document ready
});