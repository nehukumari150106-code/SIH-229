import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {getCustomerCategory} from '../../constants/customerCategories';

export default function PaymentConfirmation({route, navigation}) {
  const {pickup} = route.params;

  const category = getCustomerCategory(
    pickup.scrap_type,
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Pickup Completed
      </Text>

      <View style={styles.card}>

        <Text style={styles.success}>
          ✓ Material Collected
        </Text>

        <Text style={styles.label}>
          Material
        </Text>

        <Text style={styles.value}>
          {category.emoji} {category.label}
        </Text>

        <Text style={styles.marathi}>
          {category.marathiLabel}
        </Text>

        <Text style={styles.label}>
          Actual Weight
        </Text>

        <Text style={styles.value}>
          {pickup.actual_weight_kg ?? 0} kg
        </Text>

        <Text style={styles.label}>
          Pickup ID
        </Text>

        <Text style={styles.value}>
          {pickup.id}
        </Text>

        <Text style={styles.label}>
          Status
        </Text>

        <Text style={styles.status}>
          {pickup.status?.toUpperCase() || 'IN_PROGRESS'}
        </Text>

        <Text style={styles.lotStatus}>
          Lot: Not created yet
        </Text>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyPickups')}
      >
        <Text style={styles.buttonText}>
          Done
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
    color: '#17201C',
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

  success: {
    color: '#2E7D32',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#5F6B65',
  },

  value: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#17201C',
  },

  marathi: {
    fontSize: 13,
    color: '#5F6B65',
    marginTop: 2,
  },

  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#176B4D',
  },

  lotStatus: {
    marginTop: 18,
    fontSize: 13,
    color: '#5F6B65',
    fontStyle: 'italic',
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