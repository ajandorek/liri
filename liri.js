//defining variables
const fs = require('fs');
const spotify = require('spotify');
const request = require('request');
const twitter = require('twitter');
var command = process.argv[2];
const keys = require('./keys.js');

//setting a variable for our search query
var query = (process.argv).slice(3);

//function for spotify search
var spotifySearch = () => {
    if (query.length === 0){
        query =  "the sign ace of base"
    }
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            console.log('--------------------');
            console.log(' ');
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Title: ${data.tracks.items[0].name}`);
            console.log(`Preview: ${data.tracks.items[0].preview_url}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log(' ');
            console.log('--------------------');
        }
    });
}

//Movie search information
if (command === "movie-this"){
    //if there is no search given we run this search
    if (query.length === 0){
        query = "mr nobody";
    }
    //Grabbing our url for our movie search
    queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&r=json&tomatoes=true";

    //Returning the relevant movie information
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200) {
            console.log('--------------------');
            console.log(' ');
            console.log(`Title: ${JSON.parse(body).Title}`);
            console.log(`Release Date: ${JSON.parse(body).Released}`);
            console.log(`IMDB Rating: ${JSON.parse(body).imdbRating}`);
            console.log(`Country: ${JSON.parse(body).Country}`);
            console.log(`Language: ${JSON.parse(body).Language}`);
            console.log(`Plot: ${JSON.parse(body).Plot}`);
            console.log(`Actors: ${JSON.parse(body).Actors}`);
            console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).tomatoRating}`);
            console.log(`Rotten Tomatoes URL: ${JSON.parse(body).tomatoURL}`);
            console.log(' ');
            console.log('--------------------');
        }
    });
//The command for the spotify song search
} else if (command === "spotify-this-song"){
    spotifySearch();
//The command for reading back my 20 most recent tweets
} else if (command === "my-tweets"){
    new twitter (keys.twitterKeys).get('statuses/user_timeline', function(error, tweets, response) {
        if(error) throw error;
        for (var i = 0; i < 20; i++){
            console.log('--------------------');
            console.log(`Tweet: ${tweets[i].text}`);
            console.log(`Date: ${tweets[i].created_at}`);
            console.log('--------------------');
            console.log(' ');
        }
    });
//The command for reading the query from the text file
} else if (command === "do-what-it-says"){
    fs.readFile('random.txt', 'utf8', function(error, data){

    var things = data.split(',');
    command = things[0];
    query = things[1];
    spotifySearch();
    })
};