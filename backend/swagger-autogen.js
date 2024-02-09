const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];
//const endpointsFiles = ['./routes/*.js'];
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

const config = {
    info: {
        title: 'Chat API Documentation',
        description: 'API documentation for the Chat application.',
    },
    tags: [
        { name: 'User', description: 'Endpoints related to user management.' },
        { name: 'Chat', description: 'Endpoints related to chat functionality.' },
        { name: 'Room', description: 'Endpoints related to chatroom functionality.' },
        // Add more tags based on your API structure.
    ],
    host: `${HOST}:${PORT}`,
    schemes: ['http','https'], // Assuming you use HTTPS in production.
};

swaggerAutogen(outputFile, endpointsFiles, config);

