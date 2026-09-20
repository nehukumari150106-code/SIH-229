import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function ActivePickup({ route, navigation }) {

  const { pickup } = route.params;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Active Pickup</Text>

      <View style={styles.card}>

        <Text style={styles.material}>
          {pickup.material}
        </Text>

        <Text>
          Location: {pickup.location}
        </Text>

        <Text>
          Estimated Weight: {pickup.estimated_weight} kg
        </Text>

        <Text style={styles.status}>
          Status: Accepted
        </Text>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('RecordWeight', {
            pickup
          })
        }
      >
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

  material: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#176B4D',
    marginBottom: 10
  },

  status: {
    marginTop: 15,
    color: '#176B4D',
    fontWeight: 'bold'
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