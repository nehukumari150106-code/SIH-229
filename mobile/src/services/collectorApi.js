const BACKEND_URL = 'http://127.0.0.1:8000';


// ==========================================
// GET ALL PICKUPS
// Used by Collector → Incoming Requests
// ==========================================

export const getPickups = async () => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/pickups/`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || 'Failed to get pickups',
      );
    }

    console.log('Collector pickups:', data);

    return data;
  } catch (error) {
    console.error(
      'Get Pickups API Error:',
      error,
    );

    throw error;
  }
};


// ==========================================
// GET SINGLE PICKUP
// Temporary: fetches all pickups and finds ID
// until dedicated backend endpoint is added.
// ==========================================

export const getPickup = async pickupId => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/pickups/`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || 'Failed to get pickup',
      );
    }

    const pickup = data.find(
      item => String(item.id) === String(pickupId),
    );

    if (!pickup) {
      throw new Error('Pickup not found');
    }

    return pickup;
  } catch (error) {
    console.error(
      'Get Pickup API Error:',
      error,
    );

    throw error;
  }
};


// ==========================================
// ACCEPT PICKUP
// Backend endpoint will be connected next.
// ==========================================

export const acceptPickup = async pickupId => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/pickups/${pickupId}/assign`,
      {
        method: 'PATCH',
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || 'Failed to accept pickup',
      );
    }

    console.log(
      'Pickup assigned successfully:',
      data,
    );

    return data;
  } catch (error) {
    console.error(
      'Accept Pickup API Error:',
      error,
    );

    throw error;
  }
};
// RECORD ACTUAL PICKUP WEIGHT
export const recordPickupWeight = async (pickupId, actualWeightKg) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/pickups/${pickupId}/weight?actual_weight_kg=${encodeURIComponent(
        actualWeightKg,
      )}`,
      {
        method: 'PATCH',
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || 'Failed to record pickup weight',
      );
    }

    console.log('Actual pickup weight recorded:', data);

    return data;
  } catch (error) {
    console.error('Record Weight API Error:', error);
    throw error;
  }
};


// ==========================================
// CREATE LOT
// Backend lot endpoint will be connected later.
// ==========================================

export const createLot = async lotData => {
  throw new Error(
    'Create Lot backend endpoint is not connected yet.',
  );
};
