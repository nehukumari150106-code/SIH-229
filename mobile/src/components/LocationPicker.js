import React, { useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

// Only import MapView if it's NOT web
let MapView, Marker;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function LocationPicker({ onLocationSelect, initialRegion }) {
  const [selectedLocation, setSelectedLocation] = useState(initialRegion || null);

  const handleMapPress = (event) => {
    if (Platform.OS === 'web') return;
    const coords = event.nativeEvent.coordinate;
    setSelectedLocation(coords);
    if (onLocationSelect) {
      onLocationSelect(coords);
    }
  };

  // Fallback view for Web browser
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, styles.webFallback]}>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
          🗺️ Interactive Map View
        </Text>
        <Text style={{ textAlign: 'center', color: '#666', marginTop: 8 }}>
          Native maps are designed for Android & iOS devices. 
        </Text>
        <Text style={{ textAlign: 'center', color: '#666' }}>
          Please test the live GPS and pin-dropping feature using the Expo Go app on your phone!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={initialRegion}
        onPress={handleMapPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: 300 },
  map: { width: '100%', height: '100%' },
  webFallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
  },
});