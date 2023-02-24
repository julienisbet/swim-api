export async function createSet(workoutId, set) {
  const resp = await fetch(`/api/v1/workouts/${workoutId}/sets`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(set),
    credentials: 'include',
  });
  const data = await resp.json();
  return data;
}
