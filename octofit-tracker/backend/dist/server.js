import app from './index.js';
const PORT = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${PORT}`;
const frontendLocalUrl = 'http://localhost:5173';
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 OctoFit Tracker Backend running on ${apiBaseUrl}`);
    console.log(`🧪 API endpoints available at ${apiBaseUrl}/api`);
    console.log(`🗄️  MongoDB connection target: mongodb://localhost:27017/octofit_db`);
    console.log(`⚛️  Frontend available on ${frontendLocalUrl}`);
});
//# sourceMappingURL=server.js.map