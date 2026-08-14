import express from 'express';
import db from './config/database.js';
import { User, Team, Activity, Leaderboard, Workout } from './models/index.js';
const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const frontendLocalUrl = 'http://localhost:5173';
const frontendCodespaceUrl = codespaceName ? `https://${codespaceName}-5173.app.github.dev` : null;
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${PORT}`;
const allowedOrigins = [frontendLocalUrl, frontendCodespaceUrl, `http://localhost:${PORT}`].filter((origin) => Boolean(origin));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;
    const origin = requestOrigin && allowedOrigins.includes(requestOrigin) ? requestOrigin : frontendLocalUrl;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'OctoFit Tracker Backend is running',
        database: db.readyState === 1 ? 'connected' : 'pending',
        apiBaseUrl
    });
});
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to OctoFit Tracker Backend',
        apiBaseUrl,
        endpoints: [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/'
        ]
    });
});
app.get('/api', (req, res) => {
    res.json({
        message: 'OctoFit Tracker API',
        baseUrl: apiBaseUrl,
        endpoints: [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/'
        ]
    });
});
app.get('/api/users', async (req, res) => {
    const users = (await User.find({}).exec());
    res.json({ count: users.length, results: users });
});
app.get('/api/users/', async (req, res) => {
    const users = (await User.find({}).exec());
    res.json({ count: users.length, results: users });
});
app.get('/api/teams', async (req, res) => {
    const teams = (await Team.find({}).exec());
    res.json({ count: teams.length, results: teams });
});
app.get('/api/teams/', async (req, res) => {
    const teams = (await Team.find({}).exec());
    res.json({ count: teams.length, results: teams });
});
app.get('/api/activities', async (req, res) => {
    const activities = (await Activity.find({}).exec());
    res.json({ count: activities.length, results: activities });
});
app.get('/api/activities/', async (req, res) => {
    const activities = (await Activity.find({}).exec());
    res.json({ count: activities.length, results: activities });
});
app.get('/api/leaderboard', async (req, res) => {
    const leaderboard = (await Leaderboard.find({}).sort({ rank: 1 }).exec());
    res.json({ count: leaderboard.length, results: leaderboard });
});
app.get('/api/leaderboard/', async (req, res) => {
    const leaderboard = (await Leaderboard.find({}).sort({ rank: 1 }).exec());
    res.json({ count: leaderboard.length, results: leaderboard });
});
app.get('/api/workouts', async (req, res) => {
    const workouts = (await Workout.find({}).exec());
    res.json({ count: workouts.length, results: workouts });
});
app.get('/api/workouts/', async (req, res) => {
    const workouts = (await Workout.find({}).exec());
    res.json({ count: workouts.length, results: workouts });
});
export default app;
//# sourceMappingURL=index.js.map