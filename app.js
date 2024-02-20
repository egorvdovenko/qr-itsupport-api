const express = require('express');
const cors = require('cors');
// const https = require('https');
// const fs = require('fs');
const { sequelize } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
const port = process.env.PORT || 8000;

// Middleware for CORS
app.use(cors());

// Middleware for handling JSON
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', deviceRoutes);

// Initialize the database
async function initializeDatabase() {
  try {
    await sequelize.sync(); // Remove force: true, unless you want to drop and recreate tables on every restart
    console.log('Database successfully initialized');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
}

initializeDatabase();

// Create HTTPS server
// const options = {
//   key: fs.readFileSync('./private-key.pem'),
//   cert: fs.readFileSync('./certificate.pem'),
// };

// const server = https.createServer(options, app);

// Start the server
// server.listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

// Start the app
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
