export async function createPart(swimSetId, partDetail) {
  const resp = await fetch(`/api/v1/parts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ swimSetId, ...partDetail }),
    credentials: 'include',
  });
  const data = await resp.json();
  return data;
}

export async function deletePart(id) {
  await fetch(`/api/v1/parts/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return true;
}
