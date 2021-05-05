// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

var firebaseConfig = {
  apiKey: "AIzaSyAoKq5fPuTFALrj92cA1XYQOLeIB5ah7vE",
  authDomain: "bootcamp-43732.firebaseapp.com",
  projectId: "bootcamp-43732",
  storageBucket: "bootcamp-43732.appspot.com",
  messagingSenderId: "525194065732",
  appId: "1:525194065732:web:43aaa242f352afdf084911"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database
  var db = firebase.database();

// Assign the reference to the database to a variable named 'database'
//var database = ...


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
db.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
     highPrice = snapshot.val().highPrice
     highBidder = parseInt(snapshot.val().highBidder)


    // Change the HTML to reflect the stored values
    $("#highest-bidder").text(snapshot.val().highBidder);
    $("#highest-price").text(snapshot.val().highPrice + 'AZN');

    // Print the data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);

  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice + 'AZN');

    // Print the data to the console.
    console.log(highBidder);
    console.log(highPrice);

  }
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(e) {
  // Prevent form from submitting
  e.preventDefault();

  // Get the input values
  var bidderName = $('#bidder-name').val().trim()
  var bidderPrice = parseInt($('#bidder-price').val().trim())

  console.log(bidderName)
  console.log(bidderPrice)

  // Log the Bidder and Price (Even if not the highest)
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase

    db.ref().set({
      highBidder: bidderName,
      highPrice: bidderPrice
    })

    // Log the new High Price
    console.log(highPrice)

    // Store the new high price and bidder name as a local variable
    highBidder = bidderName;
    highPrice = parseInt(bidderPrice);


    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").text(bidderName);
    $("#highest-price").text(bidderPrice);
  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
