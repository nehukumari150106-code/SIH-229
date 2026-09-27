// mobile/src/services/api.js


// (derived from your http://127.0.0.1:8000/docs link)
const BASE_URL = 'http://127.0.0.1:8000';

// 1. Fetch available lots from the backend
export const fetchAvailableLots = async () => {
  try {
    const response = await fetch(`${BASE_URL}/lots`);
    if (!response.ok) throw new Error('Failed to fetch lots');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// 2. Submit a recycler offer to the backend
export const submitOffer = async (offerData) => {
  try {
    const response = await fetch(`${BASE_URL}/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offerData),
    });
    if (!response.ok) throw new Error('Failed to submit offer');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};