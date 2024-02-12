const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors')
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
// var https = require('https');
// var http = require('http');
// var fs = require('fs');

// Connect to the database
connectDB();

const app = express();

app.use(express.json()); // Allows sending raw JSON
app.use(express.urlencoded({ extended: false })); // Allows receiving data

// Enable CORS with specific options based on your security requirements
app.use(cors());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/rooms', require('./routes/chatRoomRoutes'));
app.use('/api/messages', require('./routes/chatRoutes'));
//commented the default
//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-standalone-preset.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.css',
    ],
  }));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    // Set the build folder as the static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html'));
    });
} else {
    app.get('*', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Chat API' });
    });
}

// Error handling middleware
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on host ${HOST} port ${PORT}`.cyan.underline));

// var options = {
//     key: fs.readFileSync('./certs/cert.key'),
//     cert: fs.readFileSync('./certs/cert.crt')
// };
// // Create an HTTP service.
// http.createServer(app).listen(PORT);
// // Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(PORT.slice(0, -1) + 1);
