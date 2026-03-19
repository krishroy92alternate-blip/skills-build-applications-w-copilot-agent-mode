import React, { useState, useEffect } from 'react';

function getRankClass(rank) {
  if (rank === 1) return 'rank-1';
  if (rank === 2) return 'rank-2';
  if (rank === 3) return 'rank-3';
  return 'rank-other';
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setEntries([...list].sort((a, b) => a.rank - b.rank));
        setLoading(false);
      })
      .catch(err => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <div className="octofit-page-header text-center">
        <h2>🏆 Leaderboard</h2>
        {!loading && !error && (
          <span className="badge bg-danger mt-1">{entries.length} entries</span>
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
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Activities</th>
                <th>Duration (hrs)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => (
                <tr key={entry.id}>
                  <td>
                    <span className={`rank-badge ${getRankClass(entry.rank)}`}>
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                    </span>
                  </td>
                  <td><strong>User {entry.user}</strong></td>
                  <td><span className="badge bg-dark">Team {entry.team}</span></td>
                  <td><span className="badge bg-primary">{entry.total_activities}</span></td>
                  <td>{entry.total_duration_hours} hrs</td>
                  <td>{entry.total_distance_km} km</td>
                  <td><span className="text-danger fw-bold">{entry.total_calories_burned} kcal</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
