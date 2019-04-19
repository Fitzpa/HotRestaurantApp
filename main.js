//import module
var express = require("express");
var path = require("path");
var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 3306,
  user: "root",
  password: "root",
  database: "reservationDB"
});




//"express" server
var app = express();
//setting up port
var PORT = process.env.PORT || 3000;

/////////////////////////////////////////////////////
//data parasing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/////////////////////////////////////////////////////
//start
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

var tableReservations = [
  {
    id: "attendee001",
    name: "Matt Rubbelke",
    email: "matt@email.com",
    phoneNumber: 123456789
  },
  {
    id: "attendee002",
    name: "Pat Black",
    email: "pat@email.com",
    phoneNumber: 4328482222
  },
  {
    id: "attendee003",
    name: "Harun Abdi",
    email: "harun@email.com",
    phoneNumber: 1432145677
  },
  {
    id: "attendee004",
    name: "Louie Fitzpatrick",
    email: "louie@email.com",
    phoneNumber: 5678901234
  },
  {
    id: "attendee005",
    name: "Test Test",
    email: "Test@email.com",
    phoneNumber: 9999999999
  }
];
var waitlistedReservations = [
  {
    id: "waiting001",
    name: "Mom",
    email: "mom@email.com",
    phoneNumber: 1002003000
  }
];

function viewTable() {
    //connection.query("SELECT * FROM reservations", function(err, res) {
        // if(err) throw err;
        
        for(var i = 0; i < tableReservations.length; i++) {
            var table = $("<div><h1 class='table-header'>Table #"+i);
            var data = $("ID: "+tableReservations.id[i]+"<br>Name: "+tableReservations.name[i]+"<br>Email: "+tableReservations.email[i]+"<br>Phone: "+ tableReservations.phoneNumber[i]);
            $("#waitlist").html(table)
            $(table).append(data)
        }
    //});
}
viewTable();

/////////////////////////////////////////////////////
// Routes for our app
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/form", function(req, res) {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

/////////////////////////////////////////////////////
// Displays our JSON objects
app.get("/api/reservations", function(req, res) {
  return res.json(tableReservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlistedReservations);
});

/////////////////////////////////////////////////////
// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  console.log(newReservation);

  /////////////////////////////////////////////////////
  // If the table reservation is greater than or equal to 5 (i.e. all 5 tables are reserved), then it pushes the new Reservation to the Waitlist array.
  if (tableReservations.length >= 5) {
    waitlistedReservations.push(newReservation);
  } else {
    tableReservations.push(newReservation);
  }

  /////////////////////////////////////////////////////
  res.json(newReservation);
});
