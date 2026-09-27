import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const myOffers = [
  { offer_id: 'OFF-001', lot_id: 'LOT-1024', price: '₹400/kg', status: 'Pending' },
  { offer_id: 'OFF-002', lot_id: 'LOT-1020', price: '₹380/kg', status: 'Accepted' }
];

export default function MyOffers() {
  const renderOffer = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titleText}>Lot: {item.lot_id}</Text>
      <Text style={styles.detailText}>Offered Price: {item.price}</Text>
      <Text style={[styles.statusText, item.status === 'Accepted' ? styles.accepted : styles.pending]}>
        Status: {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Offers</Text>
      <FlatList 
        data={myOffers}
        keyExtractor={(item) => item.offer_id}
        renderItem={renderOffer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8', padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#17201C', marginBottom: 24 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, borderColor: '#DDE5E0', borderWidth: 1, marginBottom: 16 },
  titleText: { fontSize: 16, fontWeight: '600', color: '#17201C', marginBottom: 8 },
  detailText: { fontSize: 16, color: '#5F6B65', marginBottom: 8 },
  statusText: { fontSize: 14, fontWeight: '700' },
  pending: { color: '#C77700' }, // Shared Warning/Pending Color
  accepted: { color: '#2E7D32' } // Shared Success Color
});