# Happy Tracker

![Screenshot](http://www.fadoirishpub.com/denver/wp-content/uploads/sites/28/2013/11/Fado-BrandFeature3.jpg)

Happy Tracker is an app to help you find happy hours in Denver.

Registered users can Add and Favorite happy hours.

Find it live on the web here:    
http://happy-tracker.herokuapp.com

## Created By

* Lucy Follansbee (https://github.com/lucyf44)
* Andy Knolla (https://github.com/andyknolla)
* Christopher Comella (https://github.com/chrisco)
* Evan McClaugherty (https://github.com/evan-mcclaugherty)
* Zach Zimmerman (https://github.com/ZachDZimmerman)

## Key Technologies Used

* [Node.js](https://nodejs.org)
* [Express](http://expressjs.com)
* [Knex.js](http://knexjs.org)
* [PostgreSQL](https://www.postgresql.org)
* [Passport](http://passportjs.org)

## Run It Locally

Assuming you have the required software on you computer and have it configured properly, you should be able to run the app on your machine with the following steps:

1. Create the database:
   - ````$ createdb q2db````
2. Clone and install the app:
   - ````$ git clone git@github.com:LACEZ/q2-project.git````
   - ````$ cd q2-project````
   - ````$ npm install````
3. Create the database tables:
   - ````$ psql q2db < ./db/resources/Q2_create.sql````
4. Seed the database tables:
   - ````$ knex seed:run````
4. Start the server:
   - ````$ npm start````
2. Visit: [http://localhost:3000](http://localhost:3000)
