import { useState, useEffect } from 'react'

const API_BASE_URL = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local')
    return 'http://localhost:8000'
  }
  return `https://${codespaceName}-8000.app.github.dev`
})()

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/users/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Handle both paginated and array responses
        const usersList = Array.isArray(data) ? data : data.results || data.data || []
        setUsers(usersList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading users...</p></div>
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.id}>
                <td>{user._id || user.id}</td>
                <td>{user.username || user.name}</td>
                <td>{user.email}</td>
                <td>{user.team?.name || user.teamName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
