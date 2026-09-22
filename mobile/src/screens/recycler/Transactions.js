import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const transactions = [
  { transaction_id: 'TXN-001', lot_id: 'LOT-1020', total_amount: '₹19,000', payment_status: 'completed' }
];

export default function Transactions() {
  const renderTransaction = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titleText}>{item.transaction_id}</Text>
      <Text style={styles.detailText}>Lot: {item.lot_id}</Text>
      <Text style={styles.amountText}>Amount: {item.total_amount}</Text>
      <Text style={styles.successText}>Status: {item.payment_status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Transactions</Text>
      <FlatList 
        data={transactions}
        keyExtractor={(item) => item.transaction_id}
        renderItem={renderTransaction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8', padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#17201C', marginBottom: 24 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, borderColor: '#DDE5E0', borderWidth: 1, marginBottom: 16 },
  titleText: { fontSize: 16, fontWeight: '600', color: '#17201C', marginBottom: 8 },
  detailText: { fontSize: 14, color: '#5F6B65', marginBottom: 4 },
  amountText: { fontSize: 16, fontWeight: '700', color: '#17201C', marginTop: 8 },
  successText: { fontSize: 14, fontWeight: '600', color: '#2E7D32', textTransform: 'capitalize', marginTop: 4 }
});