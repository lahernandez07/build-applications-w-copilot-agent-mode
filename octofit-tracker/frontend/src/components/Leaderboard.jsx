import { useState, useEffect } from 'react'

const getApiUrl = (endpoint) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${endpoint}/`
  }
  console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local. Falling back to localhost.')
  return `http://localhost:8000/api/${endpoint}/`
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await fetch(getApiUrl('leaderboard'))
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Handle both paginated and array responses
        const entries = Array.isArray(data) ? data : data.results || data.data || []
        setLeaderboard(entries)
        setError(null)
      } catch (err) {
        setError(err.message)
        setLeaderboard([])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading leaderboard...</p></div>
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data available</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id || entry.id}>
                <td>{index + 1}</td>
                <td>{entry.user?.name || entry.username || 'Unknown'}</td>
                <td>{entry.team?.name || entry.teamName || '-'}</td>
                <td>{entry.score || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
