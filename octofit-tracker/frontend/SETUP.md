# Octofit Tracker Frontend

A React 19 + Vite application for the Octofit Tracker multi-tier application.

## Features

- **Activity Tracking**: Monitor user activities and workouts
- **User Management**: View and manage user profiles
- **Team Management**: Create and manage teams
- **Leaderboard**: Competitive ranking system
- **Personalized Workouts**: AI-powered workout suggestions

## Technology Stack

- **React 19**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **React Router DOM v7**: Client-side routing
- **Bootstrap 5**: Responsive CSS framework
- **TypeScript-ready**: Type safety support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the frontend directory with the following:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

**Important**: The `VITE_CODESPACE_NAME` variable is required when running in GitHub Codespaces. This is used to construct the API endpoint URL:
```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/
```

To find your codespace name:
1. Go to https://github.com/codespaces
2. Look at your active codespace's name
3. Or run: `echo $CODESPACE_NAME` in the terminal

**For local development**: If `VITE_CODESPACE_NAME` is not set, the frontend will fall back to using `http://localhost:8000`.

### 3. Start Development Server

```bash
npm run dev
```

The frontend will be available at:
- Local: `http://localhost:5173`
- GitHub Codespaces: `https://musical-spoon-[id]-5173.app.github.dev` (port 5173 must be forwarded)

## Project Structure

```
src/
├── App.jsx              # Main application with routing
├── main.jsx             # Entry point
├── App.css              # Global styles
├── index.css            # Base styles
├── components/
│   ├── Activities.jsx   # Activity tracking component
│   ├── Leaderboard.jsx  # Leaderboard component
│   ├── Teams.jsx        # Team management component
│   ├── Users.jsx        # User management component
│   └── Workouts.jsx     # Personalized workouts component
└── assets/              # Static assets
```

## API Integration

### Base URL Configuration

The frontend automatically constructs API URLs using the `VITE_CODESPACE_NAME` environment variable:

```javascript
const API_BASE_URL = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local')
    return 'http://localhost:8000'
  }
  return `https://${codespaceName}-8000.app.github.dev`
})()
```

### API Endpoints

Each component fetches data from specific endpoints:

- **Activities**: `${API_BASE_URL}/api/activities/`
- **Users**: `${API_BASE_URL}/api/users/`
- **Teams**: `${API_BASE_URL}/api/teams/`
- **Workouts**: `${API_BASE_URL}/api/workouts/`
- **Leaderboard**: `${API_BASE_URL}/api/leaderboard/`

### Response Format Compatibility

The components are designed to handle multiple response formats:
- **Direct array**: `[item1, item2, ...]`
- **Paginated response**: `{ results: [item1, item2, ...], ... }`
- **Alternative format**: `{ data: [item1, item2, ...], ... }`

## Navigation

The application uses React Router DOM for client-side navigation:

- `/` - Home page
- `/activities` - Activity tracking
- `/users` - User management
- `/teams` - Team management
- `/workouts` - Personalized workouts
- `/leaderboard` - Competitive leaderboard

## Available Scripts

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Styling

The application uses Bootstrap 5 for responsive design with custom CSS in `App.css`. Key features:

- Responsive navigation bar
- Card-based layouts for data display
- Table layouts for list views
- Mobile-friendly design
- Dark navbar with light content areas

## Troubleshooting

### "VITE_CODESPACE_NAME is not defined"

This is a warning that appears if you haven't set the environment variable. The frontend will fall back to `http://localhost:8000`.

**Solution**: 
1. Create/update `.env.local` with your codespace name
2. Restart the dev server

### API Connection Issues

If you're getting CORS or connection errors:

1. Verify the backend is running on port 8000
2. Check that `VITE_CODESPACE_NAME` is correct
3. Ensure port 5173 is forwarded in GitHub Codespaces
4. Check browser console for detailed error messages

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000  # Use alternative port
```

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Contributing

Follow these guidelines when adding new components:

1. Place component files in `src/components/`
2. Use the same API URL construction pattern for consistency
3. Handle both paginated and array responses
4. Include error handling and loading states
5. Use Bootstrap classes for responsive design

## License

See [LICENSE](../../LICENSE) for details.
