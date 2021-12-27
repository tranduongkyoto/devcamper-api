# DevCamper API 

> Project of a course(Node.js API Masterclass With Express & MongoDB) in Udemy , Author: Brad Traversy
> 
> Link to Udemy Course: https://www.udemy.com/course/nodejs-api-masterclass/
> 
> Backend API for DevCamper application

## Usage

Rename ".env.env" to ".env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

## Demo

The API is live at [devcamper.io](https://devcamper.io)

Extensive documentation with examples [here](https://documenter.getpostman.com/view/8923145/SVtVVTzd?version=latest)

- Version: 1.0.0
- License: MIT
