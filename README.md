# ExpressWebProject

Simple web project using Node.js and Express

Contents of the page are in finnish. However, feel free to use it as a skeleton for your own project.

For running this project, you need to have Node.js and NPM installed on your computer. You can get both by downloading and installing NodeJs. After that, download files into any folder you want on your computer, and go to that folder by using your commandline.

Next you have to install dependancies required by the project. Make sure you are in the correct folder in commandline, and make sure you have file named package.json. Type "npm install" (without quotes) on your commandline, npm fetches all the needed modules. After that you can type "node app.js" (without quotes) and the server starts.

Open up a browser and go to address: localhost:3000

This website is a simple project for storing food recipes in MongoDB, and showing them on the page. You can add new recipies also.

You need to create MongoDB for this project if you want to make use of it. You can create one locally, or you can get free MongoDB from www.mlab.com

If you choose mlab, then you are good to go, simply create a database, and a user for that. After that you will get a connection string. Copy/paste that into app.js code and everything should be ready to go. Start the server and you should be able to add food recipes in your database.

There is a test database attached on app.js, you can test the page with that. You can replace that test database connection string with your own solution/string
