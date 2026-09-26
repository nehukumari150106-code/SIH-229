// src/api/client.js
import { Platform } from 'react-native';

// For Android Emulator, use 10.0.2.2. For physical device, replace with your local IP (e.g., http://192.168.1.X:8000)
export const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';

export async function scanAndMatchEwaste({ imageUri, location, weight, preferredTime }) {
  const formData = new FormData();

  if (imageUri) {
    const filename = imageUri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('file', {
      uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
      name: filename,
      type: type,
    });
  }

  if (weight) formData.append('weight', weight);
  if (location) formData.append('location', location);
  if (preferredTime) formData.append('preferred_time', preferredTime);

  const response = await fetch(`${BASE_URL}/api/v1/e-waste/scan-and-match`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error: ${response.status}`);
  }

  return await response.json();
}
