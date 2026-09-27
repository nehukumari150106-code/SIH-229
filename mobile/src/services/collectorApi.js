const BACKEND_URL = 'http://localhost:8000';

export const getPickups = async () => {

  const response = await fetch(
    `${BACKEND_URL}/api/pickups`
  );

  if (!response.ok) {
    throw new Error('Failed to get pickups');
  }

  return response.json();
};


export const getPickup = async (pickupId) => {

  const response = await fetch(
    `${BACKEND_URL}/api/pickups/${pickupId}`
  );

  if (!response.ok) {
    throw new Error('Failed to get pickup');
  }

  return response.json();
};


export const acceptPickup = async (pickupId) => {

  const response = await fetch(
    `${BACKEND_URL}/api/pickups/${pickupId}`,
    {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        status: 'accepted'
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to accept pickup');
  }

  return response.json();
};


export const createLot = async (lotData) => {

  const response = await fetch(
    `${BACKEND_URL}/api/lots`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(lotData)
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create lot');
  }

  return response.json();
};