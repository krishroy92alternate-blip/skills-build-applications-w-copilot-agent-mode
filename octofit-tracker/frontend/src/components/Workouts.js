import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <div className="octofit-page-header text-center">
        <h2>💪 Workouts</h2>
        {!loading && !error && (
          <span className="badge bg-danger mt-1">{workouts.length} plans</span>
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
          {workouts.map(workout => (
            <div className="col-md-6 col-lg-4" key={workout.id}>
              <div className="octofit-card card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="text-truncate me-2">{workout.title}</span>
                  <span className={`badge difficulty-${workout.difficulty_level} flex-shrink-0`}>
                    {workout.difficulty_level}
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted small mb-3">{workout.description}</p>
                  <div className="table-responsive">
                    <table className="table table-sm mb-3">
                      <tbody>
                        <tr>
                          <th className="text-muted" style={{width:'45%'}}>Type</th>
                          <td>
                            <span className="badge bg-secondary text-capitalize">{workout.workout_type}</span>
                          </td>
                        </tr>
                        <tr>
                          <th className="text-muted">Duration</th>
                          <td>{workout.duration_minutes} min</td>
                        </tr>
                        <tr>
                          <th className="text-muted">Calories</th>
                          <td>{workout.calories_estimate != null ? `${workout.calories_estimate} kcal` : '—'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div>
                      <small className="text-muted fw-bold d-block mb-1">Exercises:</small>
                      <div className="d-flex flex-wrap gap-1">
                        {(Array.isArray(workout.exercises)
                          ? workout.exercises
                          : JSON.parse(workout.exercises)
                        ).map((ex, i) => (
                          <span key={i} className="badge bg-light text-dark border">{ex}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
