// Grab the request package...
var axios = require("axios");

var args = process.argv

    for(var i = 2; i <= args.length - 1; i++) {
     var queryUrl = "http://www.omdbapi.com/?t=" + args[i] + "&y=&plot=short&apikey=trilogy";

    axios({
        method: 'GET',
        url: queryUrl,
    })
        .then(function (response) {
            console.log(response.data.Title)
        }); 
}



// Then run a request to the OMDB API with the movie specified
