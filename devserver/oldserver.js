// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import the cors middleware
// const fs = require('fs');

// const app = express();
// const PORT = 3001;

// app.use(cors()); // Enable CORS for all routes

// app.use(bodyParser.json());


// // endpoint for saving dancer data
// app.post('/api/members', (req, res) => {
//   const newDancer = req.body;

//   console.log('Received POST request:', newDancer);

//   try {
//     const existingData = JSON.parse(fs.readFileSync('./data/members.json'));
//     existingData.push(newDancer);
//     fs.writeFileSync('./data/members.json', JSON.stringify(existingData, null, 2));

//     console.log('Dancer added successfully:', newDancer);

//     res.json({ success: true, message: 'Dancer added successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // endpoint for saving performance data
// app.post('/api/performances', (req, res) => {
//   const newPerformance = req.body;

//   console.log('Received POST request:', newPerformance);

//   try {
//     const existingData = JSON.parse(fs.readFileSync('./data/performances.json'));
//     existingData.push(newPerformance);
//     fs.writeFileSync('./data/performances.json', JSON.stringify(existingData, null, 2));

//     console.log('Performance added successfully:', newPerformance);

//     res.json({ success: true, message: 'Performance added successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });


// //endpoint to fetch existing members
// app.get('/api/members', (req, res) => {
//     try {
//       const existingData = JSON.parse(fs.readFileSync('./data/members.json'));
//       res.json({ success: true, data: existingData });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   });

//   //endpoint to fetch existing performances
// app.get('/api/performances', (req, res) => {
//   try {
//     const existingData = JSON.parse(fs.readFileSync('./data/performances.json'));
//     res.json({ success: true, data: existingData });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
