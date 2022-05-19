import 'dotenv/config.js';
import morganBody from 'morgan-body';

// Express Initialization
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import cors from 'cors';

// API routes
import userRoute from './server/routes/user_route.js';
import docRoute from './server/routes/docs_route.js';
import mockServerRoute from './server/routes/mockServer_route.js';

const {
  NODE_ENV, PORT, PORT_TEST, API_VERSION,
} = process.env;
const port = NODE_ENV === 'test' ? PORT_TEST : PORT || 3000;

const app = express();
const server = http.createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
morganBody(app);

// CORS allow all
app.use(cors());

app.use(`/api/${API_VERSION}/user`, /* rateLimiterRoute, */ [userRoute]);
app.use(`/api/${API_VERSION}/docs`, /* rateLimiterRoute, */ [docRoute]);
app.use(`/api/${API_VERSION}/mock-server`, /* rateLimiterRoute, */ [mockServerRoute]);

// Page not found
app.use((req, res) => {
  res.status(404).send('page not found');
});

// Error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

server.listen(port, async () => {
  console.log(`Listening on port: ${port}`);
});
