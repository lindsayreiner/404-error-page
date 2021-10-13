const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { email, feedbackType, feedback } = req.body;
  if (email && feedbackType && feedback) {
    const newFeedback = {
      email,
      feedbackType,
      feedback,
      error_id: uuidv4(),
    };

    readAndAppend(newFeedback, './db/diagnostics.json');

    const response = {
      status: 'success',
      body: newFeedback,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = diagnostics;



// // POST Route for submitting feedback
// fb.post('/', (req, res) => {
//   // Destructuring assignment for the items in req.body
//   const { email, feedbackType, feedback } = req.body;

//   // If all the required properties are present
//   if (email && feedbackType && feedback) {
//     // Variable for the object we will save
//     const newFeedback = {
//       email,
//       feedbackType,
//       feedback,
//       feedback_id: uuidv4(),
//     };

//     readAndAppend(newFeedback, './db/feedback.json');

//     const response = {
//       status: 'success',
//       body: newFeedback,
//     };

//     res.json(response);
//   } else {
//     res.json('Error in posting feedback');
//   }
// });

// module.exports = fb;