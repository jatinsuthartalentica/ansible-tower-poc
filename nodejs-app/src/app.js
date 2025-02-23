const express = require('express');
const cors = require('cors'); // Add this line
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');
const User = require('./models/userModel'); // Import the User model

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes


// Synchronize models with the database
db.sync({ force: true }) // Set `force: true` to drop and recreate tables (use with caution)
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((err) => {
    console.error('Unable to synchronize the database:', err);
  });


// Test MySQL connection
db.authenticate()
  .then(() => {
    console.log('MySQL connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to MySQL:', err);
  });
// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management API',
      version: '1.0.0',
      description: 'API for managing user details',
    },
    servers: [
      {
        url: 'http://0.0.0.0:3000', // Update this to match your server's address
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Bind to all available network interfaces

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});