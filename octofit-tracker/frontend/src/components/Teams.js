import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <div className="octofit-page-header text-center">
        <h2>👥 Teams</h2>
        {!loading && !error && (
          <span className="badge bg-danger mt-1">{teams.length} teams</span>
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
        <div className="row g-4">
          {teams.map(team => (
            <div className="col-md-6" key={team.id}>
              <div className="octofit-card card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span>{team.name}</span>
                  <span className="badge bg-danger">Team #{team.id}</span>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">{team.description}</p>
                  <div className="table-responsive">
                    <table className="table table-sm mb-0">
                      <tbody>
                        <tr>
                          <th className="text-muted" style={{width:'40%'}}>Created</th>
                          <td>{new Date(team.created_at).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                          <th className="text-muted">Last Updated</th>
                          <td>{new Date(team.updated_at).toLocaleDateString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
