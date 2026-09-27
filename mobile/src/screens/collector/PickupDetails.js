import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { acceptPickup } from '../../services/collectorApi';

export default function PickupDetails({ route, navigation }) {

  const { pickup } = route.params;

  const handleAccept = async () => {

    try {

      await acceptPickup(pickup.pickup_id);

      navigation.navigate('ActivePickup', {
        pickup: {
          ...pickup,
          status: 'accepted'
        }
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Pickup Details</Text>

      <View style={styles.card}>

        <Text style={styles.label}>Material</Text>
        <Text style={styles.value}>{pickup.material}</Text>

        <Text style={styles.label}>Estimated Weight</Text>
        <Text style={styles.value}>
          {pickup.estimated_weight} kg
        </Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>
          {pickup.location}
        </Text>

        <Text style={styles.label}>Preferred Time</Text>
        <Text style={styles.value}>
          {pickup.preferred_time}
        </Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>
          {pickup.status}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAccept}
      >
        <Text style={styles.buttonText}>
          Accept Pickup
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDE5E0'
  },

  label: {
    color: '#5F6B65',
    marginTop: 10
  },

  value: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 3
  },

  button: {
    backgroundColor: '#176B4D',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});