import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import LocationPicker from '../../components/LocationPicker';
import { getCurrentLocation } from '../../services/locationService';

export default function LocationScreen() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleGetLiveLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      setMapRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      console.log("Live location fetched:", coords);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get My Live Location" onPress={handleGetLiveLocation} />
      <LocationPicker 
        initialRegion={mapRegion}
        onLocationSelect={(coords) => {
          console.log("Selected map coordinates:", coords);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
});