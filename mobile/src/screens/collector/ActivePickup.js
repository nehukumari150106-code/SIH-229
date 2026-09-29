import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {getCustomerCategory} from '../../constants/customerCategories';

export default function ActivePickup({route, navigation}) {
  const {pickup} = route.params;

  const category = getCustomerCategory(
    pickup.scrap_type,
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Active Pickup
      </Text>

      <View style={styles.card}>

        {/* Scrap Category */}
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

        {/* Location */}
        <Text style={styles.label}>
          Location
        </Text>

        <Text style={styles.value}>
          {pickup.address}
        </Text>

        {/* Estimated Weight */}
        <Text style={styles.label}>
          Estimated Weight
        </Text>

        <Text style={styles.value}>
          {pickup.estimated_weight_kg} kg
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
          {pickup.status?.toUpperCase() || 'ASSIGNED'}
        </Text>

      </View>

      {/* Record Weight */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('RecordWeight', {
            pickup,
          })
        }>

        <Text style={styles.buttonText}>
          Record Weight
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

  material: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#176B4D',
    marginBottom: 2,
  },

  marathi: {
    fontSize: 13,
    color: '#5F6B65',
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: '#5F6B65',
    marginTop: 10,
    marginBottom: 3,
  },

  value: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#17201C',
  },

  status: {
    marginTop: 3,
    color: '#176B4D',
    fontWeight: 'bold',
    fontSize: 15,
  },

  button: {
    backgroundColor: '#176B4D',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});