import 'dotenv/config';

const { PORT, API_VERSION } = process.env;
const port = PORT || 3000;

// Express Initialization
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import http from 'http';


const app = express();
const server = http.createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + 'public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
import { router as userRoute } from './server/routes/user_route.js';
app.use('/api/' + API_VERSION, /*rateLimiterRoute,*/ [userRoute]);


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