# Steps for getting started with Heroku
1. Get your Node project running the way we've previously done (npm init, git init, index.js...)
    - Make a new project directory and `cd` into it.
    - `npm init` to start a new Node project
    - `git init` to start a new git repository
    - `git add .`, then `git commit -m "initial commit"` to create your first commit
    - `npm install express --save` to install Express in your project. This adds a line to package.json and creates a package-lock.json.
    - Create an index.js file that starts an Express server—you can use your solution Class 2 Assignment #2a as a template
    - Create a .gitignore file with a line reading "node_modules". This prevents you from checking from checking your node_modules into git.
    - Create a new commit to add your index.js and your updated package.json
1. Push your project to GitHub
    - Log in to the GitHub website
    - Click "+" -> "New repository" on the top right
    - Give it a name, click "Create repository"
    - Read what it says. Copy the two lines for an existing repository, and paste them into your terminal, from within your new project directory.
1. Install Heroku command-line tools
    - Go to https://devcenter.heroku.com/articles/heroku-cli#download-and-install
    - "Download the installer" and run it
    - From any directory, run `heroku login` in your terminal and follow the login steps. This logs you in to Heroku across all your local terminal sessions.
1. Create a new Heroku project
    - From inside your project directory, `heroku create`
1. Launch your Heroku project.
    - Open your package.json, find the "scripts" key, and add `"start": "node index.js",` to its value. This tells Heroku how to start your project. See the "Class 3 resources" document for more explanation.
    - Change your index.js to listen on port `process.env.PORT || 8000`. This lets your project listen to the TCP port that Heroku wants it to listen to. See the "Class 3 resources" document for more explanation. In your local shell, you can try `PORT=12345 node index.js`.
    - `git push heroku master`
    - Look for a URL in the output of the above command. This is where your Heroku project is hosted publicly online. Navigate to it in a browser to make sure that it works. 


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
