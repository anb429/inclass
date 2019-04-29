# Getting started with Heroku + Node
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


# Getting started with Postgres
1. Install Homebrew
    - Go to https://brew.sh/
    - From any directory, copy and paste the "Install Homebrew" command into your terminal. This installs the `brew` command-line tool on your system. Homebrew is like a nerdier version of the App Store: it lets you easily install and uninstall certain techier tools, programs, and libraries.
1. Install postgresql
    - Run `brew install postgresql` from any directory. This installs the postgresql database on your system.
    - Run `brew services start postgresql`. This starts the postgres server now, and automatically whenever your computer starts. The postgres server runs in the background. It lets you create SQL databases on your computer and talk to them. They're stored on the filesystem, but you don't usually need to know where or how.
1. Create your first database
    - `createdb <database-name>` from any directory. This creates the postgres database—we used `createdb inclass3` in class. You only need one database per project. Using your project name as the database name is a good choice.
1. Connect to your database and try it out
    - From the command-line run `psql <database-name>`. (The `brew install` command added `createdb` and `psql` to your system.) This opens a postgres shell connected to your database. You can enter SQL queries and will be executed against your database.
    - Try creating your first table: `CREATE TABLE posts (id SERIAL PRIMARY KEY, message TEXT);`. This creates a table called "posts" in your database. A table is like a spreadsheet, and one database can have many tables. The "posts" table has two columns. The first column, "id", is a unique identifier for each row. Postgres sets it for your automatically. The "id" field serves as the primary key for the posts table, which is a special role in SQL: other fields can change, but the primary key provides a persistent notion of identity for each row. The second column, "message", is a text field where we can add our messages. A table can have many columns. If you had a "users" table, there might be columns for id, name, email, birthdate, etc.
    - Try inserting your first row: `INSERT INTO posts (message) VALUES ('My first database row');`. The "(message)" part of the SQL query tells the database which column values you're going to provide. In this case, we only provide the value for one column, but you will specify more of them if your table has more columns. We don't need to provide a value for "id" because, as the special primary key type, postgres creates it automatically.
    - Query your database: `SELECT * FROM posts;`. You'll see an ASCII representation of the posts table.
    - Press CTRL-D to exit the database shell.
    
# Getting started with Postgres + Node
1. Install the node-postgres package
    - `cd` in your project directory
    - `npm install --save pg`
1. Query your database from Node
    - Add `var { Client } = require('pg')` to your imports
    - At the top of your file, use `var client = new Client({database: '<database-name>'});` to create a client instance.
    - Then a `client.connect()` line immediately afterward. This tells your client instance to go ahead and connect.
1. Within your Express views, use the `client.query` method to query your database. This first argument is a SQL query, like the INSERT or SELECT queries your ran from the database shell. The second argument is a callback taking an error object as the first result, and a result object as the second argument.

# Getting started with Postgres + Node + Heroku
1. Do `heroku addons:create heroku-postgresql:hobby-dev` from within your project directory. This adds a new, empty database to your Heroku project. It's totally separate from your local database, so you'll need to recreate any tables you want to use.
1. In your index.js, check for the presence of the `process.env.DATABASE_URL` environment variable. You'll condition your argument to `new Client(...)` on this value.
1. If the environment variable is present, you'll pass `{connectionString: process.env.DATABASE_URL, ssl: true}` as your argument to the Client constructor.
1. Otherwise, you'll create your Client instance the same way we did above.
