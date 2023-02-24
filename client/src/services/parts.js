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
