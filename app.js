const express = require('express');
const cors = require('cors');

const { sequelize } = require('./sequelize');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const documentRoutes = require('./routes/documentRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/tickets', ticketRoutes);

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
