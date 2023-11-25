/**
 * For a greater layer of security CORS requirements will block
 * calls to the server unless specified in the following config.
 * Rather than allowing all '*' http requests you can narrow down
 * the allowed origins to a specified url such as the localhost client
 *
 * "http//localhost:5173" where 5173 is the port 'Vite' runs the client server
 */
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173", ""];

module.exports = allowedOrigins;
