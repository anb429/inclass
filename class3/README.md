# Steps for getting started with Heroku
1. Get your Node project running the way we've previously done (npm init, git init, index.js...)
2. Install Heroku command-line tools
 * https://devcenter.heroku.com/articles/heroku-cli#download-and-install
 * "Download the installer"
3. `heroku create` from inside your project directory. The first time you run this, it will ask you to log in to Heroku.
4. Add a "start" script to your package.json that runs `node index.js`.
5. Make Express listen on the port specified by `process.env.PORT`, when that value exists.
6. `git push heroku master`


# Steps for getting started with SQL

1. Install Homebrew
2. Install postgresql
 * brew install postgresql # installs postgresql on your computer; doesn't matter which directory you're in
 * brew services start postgresql # start the postgres server now, and automatically whenever your computer restarts
3. createdb <database-name> # creates the database name; we used `createdb inclass3`
4. connect to db and create a table
 * `psql <database-name>`
 * `CREATE TABLE posts (message TEXT)`
5. install 'pg' node package
6. in your index.js, create database client
7. use client to query (insert, select)
