import { useState, useEffect } from 'react'

const API_BASE_URL = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local')
    return 'http://localhost:8000'
  }
  return `https://${codespaceName}-8000.app.github.dev`
})()

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/activities/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Handle both paginated and array responses
        const activitiesList = Array.isArray(data) ? data : data.results || data.data || []
        setActivities(activitiesList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading activities...</p></div>
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || activity.id}>
                <td>{activity._id || activity.id}</td>
                <td>{activity.type}</td>
                <td>{new Date(activity.date).toLocaleDateString()}</td>
                <td>{activity.duration} minutes</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
