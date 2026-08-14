import { useState, useEffect } from 'react'

const getApiUrl = (endpoint) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${endpoint}/`
  }
  console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local. Falling back to localhost.')
  return `http://localhost:8000/api/${endpoint}/`
}

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const response = await fetch(getApiUrl('teams'))
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Handle both paginated and array responses
        const teamsList = Array.isArray(data) ? data : data.results || data.data || []
        setTeams(teamsList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setTeams([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading teams...</p></div>
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description || 'No description'}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Members: {team.members?.length || 0}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
