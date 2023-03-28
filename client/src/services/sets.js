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

export async function deleteSet(workoutId, setId) {
  await fetch(`/api/v1/workouts/${workoutId}/sets/${setId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return true;
}

export async function reorderSet(workoutId, setId, data) {
  await fetch(`/api/v1/workouts/${workoutId}/sets/${setId}/reorder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
}
