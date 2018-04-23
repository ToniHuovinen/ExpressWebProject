// Get Express
var express = require("express");
var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

// Test database, replace this string with your own solution/connection string
var mongoDB = "mongodb://webbiprojekti:webbi@ds261118.mlab.com:61118/testailua";

// Create connection to mLab MongoDB
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(bodyParser.urlencoded({extended: true}));

// Access files in the public folder
app.use(express.static('public'));


//SCHEMA - Create a new entry to DB with this
var reseptiSchema = new mongoose.Schema({
    nimi: String,       // name of dish
    kuva: String,       // url of picture
    ainekset: String,   // ingredients
    resepti: String     // recipe
});

var Resepti = mongoose.model("Resepti", reseptiSchema);


// Routes
app.get("/", function(req, res){
	res.render("landingp.ejs");
});



app.get("/main", function(req, res) {

	Resepti.find({}, function(err, kaikkiReseptit){ // Finds a recipes from database
		if(err){
			console.log(err)
		}
		else{
			res.render("main.ejs", {reseptit:kaikkiReseptit}); // Passes the recipes to the front end
		}
	});
});



// POST - route for the new information
app.post("/main", function(req, res){
    
    var nimi = req.body.nimi;               // name
    var kuva = req.body.kuva;               // url of picture
    var ainekset = req.body.ainekset;       // ingredients
    var resepti = req.body.resepti;         // recipe
    var uusiResepti = {nimi:nimi, kuva:kuva, ainekset:ainekset, resepti:resepti}; // new recipe
    
    // Create a new recipe and store it in the DB
    Resepti.create(uusiResepti, function(err, luotuResepti){
        if(err){
            console.log(err)
        } else {
            // Direct to main
            res.redirect("/main");
        }
    });
});

app.get("/new", function(req, res){
	res.render("new.ejs");
});



app.get("/random", function(req, res){

    Resepti.count().exec(function (err, count) { // Checks how many recipes there are in database

        var random = Math.floor(Math.random() * count); // Random number

        Resepti.findOne().skip(random).exec(function (err, satunnainenResepti) {

            res.render("show.ejs", {resepti:satunnainenResepti}); 
        });
    });
});

// Show the info of the clicked food
app.get("/:id", function(req, res){

    // Find recipe with the given ID
    Resepti.findById(req.params.id, function(err, loydettyResepti){
        if(err){
            console.log(err)
        } else {
            // Render the page and it's content
            res.render("show.ejs", {resepti:loydettyResepti});
        }
    });

});

// Start a server on port 3000
app.listen(3000, function(){
	console.log("Server started. Listening on port 3000!");
});