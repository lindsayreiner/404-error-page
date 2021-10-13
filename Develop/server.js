const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const diagnostics = require('./db/diagnostics.json')

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

//GET route for /api/diagnostics that will return the content of db/diagnostics/json 
app.get('/api/diagnostics', (req, res) => res.json(diagnostics));

//POST route for /api/diagnostics that will store information about the invalid form submissions. 
app.post('/api/diagnostics', (req, res) => {
  // Let the client know that their POST request was received
  res.json(`${req.method} request received`);

  // Show the user agent information in the terminal
  console.info(req.rawHeaders);

  // Log our request to the terminal
  console.info(`${req.method} request received`);
});


//Wildcard route for 404 error
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
