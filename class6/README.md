In class 6, we covered a few different topics:
- nodemon
- Authentication — see the 'auth' directory for an example app
- Client vs. Server JS worlds
- Basics of web security: SQLi, XSS, CSRF
- create-react-app
- SASS

For create-react-app, here's what we did:
1. `npm init react-app my-app` - This creates your app, called 'my-app' for the example. It automatically creates a git repository (.git directory) and NPM project (package.json) as well. That means you'll want to do it outside of any existing repos.

2. `cd my-app` and `npm start` - This starts the server. It will automatically restart when you change a file. It also helpfully opens a browser window.

3. Rename App.css to App.scss, and `npm install node-sass --save` to start using SASS. 

4. `heroku create` and `git push heroku master` to get your project hosted online.

5. Start creating our own React components!

Help with SASS and React:
https://sass-lang.com/guide
https://reactjs.org/tutorial/tutorial.html
