import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function PaymentConfirmation({ route, navigation }) {

  const { pickup, lot } = route.params;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Pickup Completed
      </Text>

      <View style={styles.card}>

        <Text style={styles.success}>
          ✓ Material Collected
        </Text>

        <Text>
          Material: {pickup.material}
        </Text>

        <Text>
          Actual Weight: {lot?.actual_weight || 0} kg
        </Text>

        <Text>
          Lot ID: {lot?.lot_id || 'Pending'}
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

  success: {
    color: '#2E7D32',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
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