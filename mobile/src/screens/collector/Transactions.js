import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

export default function Transactions() {

  const transactions = [
    {
      transaction_id: 'TXN-001',
      material: 'PCB',
      amount: 1920,
      payment_method: 'UPI',
      payment_status: 'completed'
    }
  ];

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Transactions
      </Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.transaction_id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.material}>
              {item.material}
            </Text>

            <Text>
              Transaction: {item.transaction_id}
            </Text>

            <Text>
              Amount: ₹{item.amount}
            </Text>

            <Text>
              Payment: {item.payment_method}
            </Text>

            <Text style={styles.status}>
              {item.payment_status}
            </Text>

          </View>

        )}
      />

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
    marginBottom: 15
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12
  },

  material: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#176B4D'
  },

  status: {
    color: '#2E7D32',
    fontWeight: 'bold',
    marginTop: 8
  }
});