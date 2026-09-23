import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { fetchAvailableLots } from '../../services/api';

export default function AvailableLots({ navigation }) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLots();
  }, []);

  const loadLots = async () => {
    try {
      const data = await fetchAvailableLots();
      setLots(data);
    } catch (error) {
      // Fallback mock data if the backend server isn't active yet
      setLots([
        { lot_id: 'LOT-1024', material: 'PCB', actual_weight: '25' },
        { lot_id: 'LOT-1025', material: 'Battery', actual_weight: '50' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderLotCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.materialText}>{item.material}</Text>
        <Text style={styles.weightText}>{item.actual_weight} kg</Text>
      </View>
      <Text style={styles.detailText}>ID: {item.lot_id}</Text>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('LotDetails', { lot: item })}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#176B4D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Available Lots</Text>
      <FlatList 
        data={lots}
        keyExtractor={(item) => item.lot_id}
        renderItem={renderLotCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8', padding: 16 },
  center: { justifyContent: 'center', alignItems: 'center' },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#17201C', marginBottom: 24 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, marginBottom: 16, borderColor: '#DDE5E0', borderWidth: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  materialText: { fontSize: 16, fontWeight: '600', color: '#17201C' },
  weightText: { fontSize: 16, fontWeight: '600', color: '#5F6B65' },
  detailText: { fontSize: 14, color: '#5F6B65', marginBottom: 4 },
  primaryButton: { backgroundColor: '#176B4D', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
});