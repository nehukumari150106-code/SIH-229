import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Mock data using the exact structure required by the shared contract
const availableLots = [
  {
    lot_id: 'LOT-1024',
    material: 'PCB',
    weight: '25 kg',
    distance: '8 km away',
  },
  {
    lot_id: 'LOT-1025',
    material: 'Battery',
    weight: '150 kg',
    distance: '12 km away',
  }
];

export default function AvailableLots({ navigation }) {
  const renderLotCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.materialText}>{item.material}</Text>
        <Text style={styles.weightText}>{item.weight}</Text>
      </View>
      <Text style={styles.detailText}>{item.lot_id}</Text>
      <Text style={styles.detailText}>{item.distance}</Text>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('MakeOffer', { lot: item })}
      >
        <Text style={styles.buttonText}>View & Make Offer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Available Lots</Text>
      <FlatList 
        data={availableLots}
        keyExtractor={(item) => item.lot_id}
        renderItem={renderLotCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#17201C',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#DDE5E0',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  materialText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17201C',
  },
  weightText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5F6B65',
  },
  detailText: {
    fontSize: 14,
    color: '#5F6B65',
    marginBottom: 4,
  },
  primaryButton: {
    backgroundColor: '#176B4D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});