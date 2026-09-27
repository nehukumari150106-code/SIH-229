import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function TransactionDetails({ route }) {

  const transaction = route.params?.transaction;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Transaction Details
      </Text>

      <View style={styles.card}>

        <Text>
          Transaction ID
        </Text>

        <Text style={styles.value}>
          {transaction?.transaction_id || 'TXN-001'}
        </Text>

        <Text>
          Material
        </Text>

        <Text style={styles.value}>
          {transaction?.material || 'PCB'}
        </Text>

        <Text>
          Amount
        </Text>

        <Text style={styles.amount}>
          ₹{transaction?.amount || 0}
        </Text>

        <Text>
          Payment Method
        </Text>

        <Text style={styles.value}>
          {transaction?.payment_method || 'UPI'}
        </Text>

        <Text>
          Payment Status
        </Text>

        <Text style={styles.status}>
          {transaction?.payment_status || 'completed'}
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

  value: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 18
  },

  amount: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#176B4D',
    marginBottom: 18
  },

  status: {
    color: '#2E7D32',
    fontWeight: 'bold'
  }
});