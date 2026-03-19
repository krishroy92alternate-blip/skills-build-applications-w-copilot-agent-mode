import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <div className="octofit-page-header text-center">
        <h2>👤 Users</h2>
        {!loading && !error && (
          <span className="badge bg-danger mt-1">{users.length} heroes</span>
        )}
      </div>

      {error && <div className="alert alert-danger"><strong>Error:</strong> {error}</div>}

      {loading ? (
        <div className="octofit-loading">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive octofit-table">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <span className="badge bg-secondary">{user.id}</span>
                  </td>
                  <td>
                    <strong>@{user.username}</strong>
                  </td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>
                    <a href={`mailto:${user.email}`} className="text-decoration-none text-danger">
                      {user.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
