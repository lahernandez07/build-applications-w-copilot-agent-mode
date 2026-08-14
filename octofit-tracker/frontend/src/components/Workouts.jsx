import { useState, useEffect } from 'react'

const API_BASE_URL = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local')
    return 'http://localhost:8000'
  }
  return `https://${codespaceName}-8000.app.github.dev`
})()

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/workouts/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Handle both paginated and array responses
        const workoutsList = Array.isArray(data) ? data : data.results || data.data || []
        setWorkouts(workoutsList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setWorkouts([])
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading workouts...</p></div>
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div className="container mt-4">
      <h2>Personalized Workout Suggestions</h2>
      {workouts.length === 0 ? (
        <p>No workout suggestions available</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name || workout.type}</h5>
                  <p className="card-text">{workout.description || 'Personalized workout'}</p>
                  <ul className="list-unstyled">
                    {workout.exercises && workout.exercises.length > 0 && (
                      <>
                        <li><strong>Exercises:</strong></li>
                        {workout.exercises.map((exercise, idx) => (
                          <li key={idx} className="ms-3">
                            {exercise.name || exercise} - {exercise.reps || exercise.duration || ''} 
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                  <p className="card-text mt-3">
                    <small className="text-muted">
                      Duration: {workout.duration || 'Not specified'} minutes
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
