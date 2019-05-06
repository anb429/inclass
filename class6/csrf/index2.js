// Example of user authentication
// Based on https://itp.nyu.edu/~sve204/dwd_spring2018/cookies_sessions_logins_https.html

var express = require('express');
var mustacheExpress = require('mustache-express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var crypto = require("crypto");
var { Client } = require('pg');


var PORT = process.env.PORT || 8000;

var app = express();
app.use('/static', express.static('public'))
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var client = new Client({ database: 'class6_auth' });
client.connect();

const createUserQuery = "INSERT INTO users (username, password) VALUES ($1, $2)";
const createSessionQuery = "INSERT INTO sessions (sessionid, user_id) VALUES ($1, $2)";
const getUserByIDQuery = "SELECT * FROM users WHERE id=$1"; // Will return at most one row because 'id' is the primary key
const getUserByUsernameQuery = "SELECT * FROM users WHERE username=$1"; // Will return at most one row because 'username' has a UNIQUE constraint
const getSessionQuery = "SELECT * FROM sessions WHERE sessionid=$1"; // Will return at most one row because 'sessionid' is the primary key
const deleteSessionQuery = "DELETE FROM sessions WHERE sessionid=$1";

function generateHash(password) {
	return bcrypt.hashSync(password);
}

function compareHash(password, hash) {
	return bcrypt.compareSync(password, hash);
}

function generateSessionID() {
	return crypto.randomBytes(20).toString('hex');
}

app.get('/', function (req, res) {
	console.log("Cookies:", req.cookies);

	var sessionid = req.cookies.sessionid;
	if (!sessionid) {
		console.log("No session id");
		res.render('index');
		return;
	}

	console.log("Session ID:", sessionid);
	client.query(getSessionQuery, [sessionid], function (err, sessionResult) {
		console.log("Found session rows:", sessionResult.rows);

		if (!sessionResult.rows.length) {
			console.log("No session found with that sessionid");
			res.render('index');
			return;
		}

		var session = sessionResult.rows[0];

		client.query(getUserByIDQuery, [session.user_id], function (err, userResult) {
			console.log("Found user rows:", userResult.rows);

			if (!userResult.rows.length) {
				console.log("No user found with that id");
				res.render('index');
				return;
			}

			var user = userResult.rows[0];
			console.log("User", user.username, "is logged in!");
			res.render('index', {
				user: user
			});
			return;
		});
	});
});

app.get('/register', function (req, res) {
	res.redirect('/');
});

app.post('/register', function (req, res) {
	// TODO: Check password length
	// TODO: Check if user already exists
	// TODO: Show a success or error message
	// TODO: Automatically sign in the user on register
	console.log("Register got POST:", req.body);
	var username = req.body.username;
	var passwordHash = generateHash(req.body.password);
	client.query(createUserQuery, [username, passwordHash], function (err, createUserResult) {
		if (err) {
			console.log("Registration DB error:", err);
		} else {
			console.log("User", username, "created!");
		}
		res.redirect('/');
	})
});

app.get('/login', function (req, res) {
	res.redirect('/');
});

app.post('/login', function (req, res) {
	// TODO: Show a success or error message

	console.log("Login got POST:", req.body);
	var username = req.body.username;

	client.query(getUserByUsernameQuery, [username], function (err, userResult) {
		if (err) {
			console.log("Login database error:", err);
			res.redirect('/');
			return;
		}

		if (!userResult.rows.length) {
			console.log("Unknown username");
			res.redirect('/');
			return;
		}

		var user = userResult.rows[0];

		if (!compareHash(req.body.password, user.password)) {
			console.log("Wrong password");
			res.redirect('/');
			return;
		}
		
		// Username + password are valid!;
		var sessionid = generateSessionID();
		client.query(createSessionQuery, [sessionid, user.id], function (err, sessionResult) {
			if (err) {
				console.log("Error creating sessions:", err);
				res.redirect('/');
				return;
			}
			console.log("Session created! Setting user cookie...");
			res.cookie('sessionid', sessionid);
			res.redirect('/');
			return;
		});
	});

});

app.post('/logout', function (req, res) {
	client.query(deleteSessionQuery, [req.cookies.sessionid], function(err) {
		if (err) {
			console.log("Error deleting session:", err);
		}
		res.cookie('sessionid', null);
		res.redirect('/');
	});
});

app.listen(PORT, function () {
	console.log('App listining on port: ' + PORT)
})