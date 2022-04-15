require('dotenv').config();
const { PORT, API_VERSION } = process.env;
const port = PORT || 3000;

// Express Initialization
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(
    '/api/' + API_VERSION,
    /*rateLimiterRoute,*/ [
        require('./server/routes/user_route'),
    ]
);

app.use('/api/' + API_VERSION, require('./server/routes/user_route'));

// Page not found
app.use(function (req, res, next) {
    res.status(404).send('page not found');
});

// Error handling
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

server.listen(port, async () => {
  console.log(`Listening on port: ${port}`);
});