import React, { useState, useEffect } from 'react';

const ACTIVITY_COLORS = {
  running: 'primary',
  cycling: 'success',
  swimming: 'info',
  weightlifting: 'warning',
  yoga: 'secondary',
  cardio: 'danger',
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <div className="octofit-page-header text-center">
        <h2>🏃 Activities</h2>
        {!loading && !error && (
          <span className="badge bg-danger mt-1">{activities.length} logged</span>
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
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity.id}>
                  <td><span className="badge bg-secondary">{activity.id}</span></td>
                  <td><strong>User {activity.user}</strong></td>
                  <td>
                    <span className={`activity-badge badge bg-${ACTIVITY_COLORS[activity.activity_type] || 'secondary'}`}>
                      {activity.activity_type}
                    </span>
                  </td>
                  <td>{activity.duration_minutes} <small className="text-muted">min</small></td>
                  <td>{activity.distance_km != null ? `${activity.distance_km} km` : <span className="text-muted">—</span>}</td>
                  <td>{activity.calories_burned != null ? `${activity.calories_burned} kcal` : <span className="text-muted">—</span>}</td>
                  <td><small className="text-muted">{activity.description}</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;