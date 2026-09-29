import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {acceptPickup} from '../../services/collectorApi';
import {getCustomerCategory} from '../../constants/customerCategories';

export default function PickupDetails({route, navigation}) {
  const {pickup} = route.params;

  const [loading, setLoading] = useState(false);

  const category = getCustomerCategory(
    pickup.scrap_type,
  );

  const handleAccept = async () => {
    try {
      setLoading(true);

      const updatedPickup = await acceptPickup(
        pickup.id,
      );

      navigation.navigate('ActivePickup', {
        pickup: updatedPickup,
      });
    } catch (error) {
      console.error(
        'Accept Pickup Error:',
        error,
      );

      Alert.alert(
        'Accept Pickup Failed',
        error.message ||
          'Could not accept this pickup.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Pickup Details
      </Text>

      <View style={styles.card}>

        {/* Category */}
        <Text style={styles.label}>
          Scrap Category
        </Text>

        <Text style={styles.material}>
          {category.emoji} {category.label}
        </Text>

        <Text style={styles.marathi}>
          {category.marathiLabel}
        </Text>

        {/* Pickup ID */}
        <Text style={styles.label}>
          Pickup ID
        </Text>

        <Text style={styles.value}>
          {pickup.id}
        </Text>

        {/* Estimated Weight */}
        <Text style={styles.label}>
          Estimated Weight
        </Text>

        <Text style={styles.value}>
          {pickup.estimated_weight_kg} kg
        </Text>

        {/* Location */}
        <Text style={styles.label}>
          Location
        </Text>

        <Text style={styles.value}>
          {pickup.address}
        </Text>

        {/* Preferred Time */}
        <Text style={styles.label}>
          Preferred Time
        </Text>

        <Text style={styles.value}>
          {pickup.preferred_time || 'Not specified'}
        </Text>

        {/* Status */}
        <Text style={styles.label}>
          Status
        </Text>

        <Text style={styles.status}>
          {pickup.status?.toUpperCase() || 'PENDING'}
        </Text>

      </View>

      {/* Accept Button */}
      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.buttonDisabled,
        ]}
        disabled={loading}
        onPress={handleAccept}>
        <Text style={styles.buttonText}>
          {loading
            ? 'Accepting...'
            : 'Accept Pickup'}
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#176B4D',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDE5E0',
    elevation: 2,
  },

  label: {
    color: '#5F6B65',
    marginTop: 12,
    fontSize: 13,
  },

  material: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#176B4D',
    marginTop: 4,
  },

  marathi: {
    fontSize: 13,
    color: '#5F6B65',
    marginTop: 2,
  },

  value: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#17201C',
    marginTop: 3,
  },

  status: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#C77700',
    marginTop: 3,
  },

  button: {
    backgroundColor: '#176B4D',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});