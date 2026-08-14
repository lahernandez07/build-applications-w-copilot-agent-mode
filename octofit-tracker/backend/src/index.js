"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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