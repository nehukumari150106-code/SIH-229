import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { createLot } from '../../services/collectorApi';

export default function RecordWeight({ route, navigation }) {

  const { pickup } = route.params;

  const [actualWeight, setActualWeight] = useState('');

  const saveWeight = async () => {

    if (!actualWeight) {
      Alert.alert('Enter weight', 'Please enter actual weight.');
      return;
    }

    try {

      const lot = await createLot({
        pickup_id: pickup.pickup_id,
        material: pickup.material,
        estimated_weight: pickup.estimated_weight,
        actual_weight: Number(actualWeight),
        collector_id: pickup.collector_id || null,
        status: 'collected'
      });

      navigation.navigate('PaymentConfirmation', {
        pickup,
        lot
      });

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'Unable to record weight.'
      );
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Record Weight
      </Text>

      <View style={styles.card}>

        <Text>
          Material: {pickup.material}
        </Text>

        <Text style={styles.estimated}>
          Customer Estimated Weight:
          {' '}
          {pickup.estimated_weight} kg
        </Text>

        <Text style={styles.label}>
          Actual Weight
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter weight in kg"
          keyboardType="numeric"
          value={actualWeight}
          onChangeText={setActualWeight}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={saveWeight}
        >
          <Text style={styles.buttonText}>
            Save Weight
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
    borderRadius: 12
  },

  estimated: {
    marginTop: 15,
    color: '#5F6B65'
  },

  label: {
    marginTop: 20,
    fontWeight: 'bold'
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDE5E0',
    padding: 13,
    borderRadius: 8,
    marginTop: 8
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
    fontWeight: 'bold'
  }
});