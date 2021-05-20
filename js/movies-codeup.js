"use strict";

$(document).ready(function(){
    let movieArray = [];
    let url = "https://shadowed-deciduous-gecko.glitch.me/movies";
    const moviePosters = () => {
        let loader = `<div class="loading"><img src="img/loading.gif"></div>`;
        $("#container").html(loader);
        fetch(url)
            .then(resp => resp.json())
            .then(movies => {
                movieArray = movies;
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
                $("#selectMenu").append(html);
                $("#selectMenu2").html(html);
            });
    }
    moviePosters();

    $(".remove-hidden").click(function() {
        $("#selectMenu2").removeClass("hidden");
        $("#delete-movie").removeClass("hidden");
    });

    //edit movie
    $("#selectMenu").change(function(){
        let target = $(this).val()
        console.log(target);
        //show menu and then use targeted fields to PATCH the selected movie with new information
        $(".rightSide").children().removeClass("hidden");

        //grab info from the input fields
        //edit function
        for (let movie of movieArray) {
            if (movie.id == target) {
                $("#newTitle").val(movie.title);
                $("#newGenre").val(movie.genre);
                $("#newRating").val(movie.rating);
                $("#newDirector").val(movie.director);
                $("#newPlot").val(movie.plot);
            }
        }
        $("#changeMovie").click(function(){

            let insert = {
                title: $("#newTitle").val(),
                genre: $("#newGenre").val(),
                rating: $("#newRating").val(),
                director: $("#newDirector").val(),
                plot: $("#newPlot").val()
            }
            let patchOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(insert)
            }
            //PATCH
            fetch(`https://shadowed-deciduous-gecko.glitch.me/movies/${target}`, patchOptions)
                .then(moviePosters);
        });

    })

    //delete movie
    let deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    $("#selectMenu2").change(function()  {
        let inputVal = $(this).val();
        console.log("hello: " + inputVal);
        $("#delete-movie").click(function() {
            fetch(`https://shadowed-deciduous-gecko.glitch.me/movies/${inputVal}`, deleteOptions)
                .then(moviePosters);
        });
    });



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


    //end of document ready
});