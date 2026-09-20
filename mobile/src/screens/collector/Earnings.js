import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function Earnings() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Earnings
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Total Earnings
        </Text>

        <Text style={styles.amount}>
          ₹1,920
        </Text>

        <Text style={styles.label}>
          Completed Pickups
        </Text>

        <Text style={styles.value}>
          8
        </Text>

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

  label: {
    color: '#5F6B65',
    marginTop: 10
  },

  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#176B4D',
    marginVertical: 10
  },

  value: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});