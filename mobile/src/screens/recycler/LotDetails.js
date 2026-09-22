import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LotDetails({ route, navigation }) {
  // If no lot data is passed, use the Day 1 default
  const lot = route?.params?.lot || { 
    lot_id: 'LOT-1024', 
    material: 'PCB', 
    weight: '25 kg', 
    distance: '8 km away',
    status: 'collected' // Shared status from Day 1 contract
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Lot Details</Text>
      
      <View style={styles.card}>
        {/* Placeholder for the scrap photo */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Material Photo</Text>
        </View>

        <Text style={styles.titleText}>{lot.lot_id}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Material:</Text>
          <Text style={styles.value}>{lot.material}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Actual Weight:</Text>
          <Text style={styles.value}>{lot.weight}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{lot.distance}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.successText}>{lot.status}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MakeOffer', { lot: lot })}
        >
          <Text style={styles.buttonText}>Make Offer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8', padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#17201C', marginBottom: 24 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, borderColor: '#DDE5E0', borderWidth: 1 },
  imagePlaceholder: { height: 150, backgroundColor: '#E8F5EF', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  imageText: { color: '#176B4D', fontWeight: '600' },
  titleText: { fontSize: 18, fontWeight: '700', color: '#17201C', marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { fontSize: 16, color: '#5F6B65' },
  value: { fontSize: 16, fontWeight: '600', color: '#17201C' },
  successText: { fontSize: 16, fontWeight: '600', color: '#2E7D32', textTransform: 'capitalize' },
  primaryButton: { backgroundColor: '#176B4D', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});