import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {getCustomerCategory} from '../../constants/customerCategories';
import {recordPickupWeight} from '../../services/collectorApi';

export default function RecordWeight({route, navigation}) {
  const {pickup} = route.params;

  const [actualWeight, setActualWeight] = useState('');
  const [loading, setLoading] = useState(false);

  const category = getCustomerCategory(
    pickup.scrap_type,
  );

  const saveWeight = async () => {
    if (!actualWeight) {
      Alert.alert(
        'Enter weight',
        'Please enter the actual collected weight.',
      );
      return;
    }

    const weight = parseFloat(actualWeight);

    if (isNaN(weight) || weight <= 0) {
      Alert.alert(
        'Invalid weight',
        'Please enter a valid weight greater than 0 kg.',
      );
      return;
    }

    try {
      setLoading(true);

      // Save actual weight to the backend
      const updatedPickup = await recordPickupWeight(
        pickup.id,
        weight,
      );

      console.log(
        'Pickup weight saved:',
        updatedPickup,
      );

      navigation.navigate('PaymentConfirmation', {
        pickup: updatedPickup,
      });
    } catch (error) {
      console.error(
        'Record Weight Error:',
        error,
      );

      Alert.alert(
        'Failed to save weight',
        error.message ||
          'Unable to record weight.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Record Weight
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

        {/* Customer Estimated Weight */}
        <Text style={styles.label}>
          Customer Estimated Weight
        </Text>

        <Text style={styles.estimated}>
          {pickup.estimated_weight_kg} kg
        </Text>

        {/* Location */}
        <Text style={styles.label}>
          Location
        </Text>

        <Text style={styles.value}>
          {pickup.address}
        </Text>

        {/* Actual Weight */}
        <Text style={styles.label}>
          Actual Collected Weight
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter weight in kg"
          keyboardType="decimal-pad"
          value={actualWeight}
          onChangeText={setActualWeight}
          editable={!loading}
        />

        <Text style={styles.helper}>
          Enter the weight measured by the collector.
        </Text>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
          disabled={loading}
          onPress={saveWeight}>

          <Text style={styles.buttonText}>
            {loading
              ? 'Saving...'
              : 'Save Weight'}
          </Text>

        </TouchableOpacity>

      </View>

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
    marginTop: 15,
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

  estimated: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#17201C',
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDE5E0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    height: 52,
    borderRadius: 8,
    marginTop: 5,
    fontSize: 16,
  },

  helper: {
    fontSize: 12,
    color: '#5F6B65',
    marginTop: 6,
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