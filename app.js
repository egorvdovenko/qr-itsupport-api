const process = require('process');
const express = require('express');
const cors = require('cors');
const http = require('http');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { sequelize } = require('./sequelize');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const documentRoutes = require('./routes/documentRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const server = http.createServer(app); // Create HTTP server

const port = process.env.PORT || 8000;
const host = process.env.HOST || '0.0.0.0';

app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/tickets', ticketRoutes);

async function initializeDatabase() {
  try {
    await sequelize.sync(); // Remove force: true, unless you want to drop and recreate tables on every restart
    console.log('Database successfully initialized');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
}

initializeDatabase();

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
