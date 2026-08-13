import express from 'express';
import db from './config/database.js';
const app = express();
const PORT = process.env.PORT || 8000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS middleware (allow frontend on 5173)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'OctoFit Tracker Backend is running' });
});
// Routes placeholder
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to OctoFit Tracker Backend' });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 OctoFit Tracker Backend running on http://localhost:${PORT}`);
    console.log(`📦 MongoDB connected on mongodb://localhost:27017`);
    console.log(`⚛️  Frontend available on http://localhost:5173`);
});
//# sourceMappingURL=index.js.map