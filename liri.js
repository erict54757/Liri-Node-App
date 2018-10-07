require("dotenv").config();
//  gather api keys from keys.js
var spotify = require("./keys.js");
var omdbKey = spotify.omdb.api;
var key = spotify.spotify.id;
var secret = spotify.spotify.secret;
var call = process.argv[2];
var randomArr=[];
var spotifyErr= [];
var movieErr=[];
// concacktanated input after argv 2
var input = process.argv.splice(3).join(" ");


// console.log (input);
// console.log(key);
// console.log (secret);


// spotify request
var myCalls = {
    itSays: function() {

        // if (process.argv[2] === "do-what-it-says") {
            // fs is a core Node package for reading and writing files
            var fs = require("fs");
        
            // This block of code will read from the "random.txt" file.
            // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
            // The code will store the contents of the reading inside the variable "data"
            fs.readFile("random.txt", "utf8", function (error, data) {
        
                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }
        
                // We will then print the contents of data
               
        
                // Then split it by commas (to make it more readable)
                
                var dataSplit = data.split("/");
                var movieTxt = dataSplit[1].split(",");
                 var spotifyTxt =dataSplit[0].split(",");
                // console.log(movieTxt[1]);
                // We will then re-display the content as an array for later use.
                // console.log(dataArr);
                randomArr.push(dataSplit);
                spotifyErr.push(spotifyTxt);
                movieErr=(movieTxt);
                
                // console.log(spotifyErr[0][0]);
                console.log(movieErr);
                
        
        
            })
            },
    spotifyFunction: function () {
        myCalls.itSays()
        var Spotify = require('node-spotify-api');

        var spotify = new Spotify({
            id: key,
            secret: secret
        });

        spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
            if (err) {
                return    console.log(spotifyErr[0][0]), input=spotifyErr[0][1], console.log(input), myCalls.spotifyFunction();
            }

            console.log(JSON.stringify(data.tracks.items[0].album.artists[0].external_urls.spotify, null, 2));
            console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2))
            console.log(JSON.stringify(data.tracks.items[0].album.name));
            console.log(JSON.stringify(data.tracks.items[0].name));
        })
    },

    movieFunction: function () {
        myCalls.itSays();
        // this movie request cannnot search through response for some reason
        // if (process.argv[2]==="this-movie"){
        var request = require('request');
        request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t='+input, function (error, response, body) {
            if (error){
               return console.log(movieErr[0]), input=movieErr[1], console.log(input);
                //  myCalls.movieFunction();
        }
        // {"Response":"False","Error":"Movie not found!"}
        console.log(body);
            //   console.log(JSON.parse(body));
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Ratings[1].Value); // Print the HTML for the Google homepage.
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);

        })
    },
   

    // }else if (process.argv[2]==="concert-this"){
    bandsFunction: function () {
        var requested = require('request');
        requested('https://rest.bandsintown.com/artists/'+input+'/events?app_id=codingbootcamp', function (error, response, body) {
            
        console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode);
        
            console.log(JSON.parse(body)[0].venue.name);
            console.log(JSON.parse(body)[0].venue.city);
            console.log(JSON.parse(body)[0].datetime);
        })
    }

     
};
if (call==="concert-this"){
myCalls.bandsFunction();
};
if (call==="spotify-this-song"){
myCalls.spotifyFunction();
};
if (call==="movie-this"){
    myCalls.movieFunction();
}
if (call==="do-what-it-says"){
    myCalls.itSays();
}