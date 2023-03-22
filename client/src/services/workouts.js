export async function fetchWorkouts() {
  const resp = await fetch(`/api/v1/workouts`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await resp.json();
  return data;
}
export async function createWorkout(workout) {
  const resp = await fetch(`/api/v1/workouts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workout),
    credentials: 'include',
  });
  const data = await resp.json();
  return data;
}

export async function fetchWorkout(id) {
  const resp = await fetch(`/api/v1/workouts/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await resp.json();
  return data;
}
