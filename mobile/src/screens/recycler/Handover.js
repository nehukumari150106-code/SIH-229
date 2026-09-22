import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Handover({ navigation }) {
  const handleConfirm = () => {
    Alert.alert('Success', 'Handover confirmed. Material received.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Material Handover</Text>
      
      <View style={styles.card}>
        <Text style={styles.titleText}>Pending Handover: LOT-1020</Text>
        <Text style={styles.detailText}>Aggregator: AGG-002</Text>
        <Text style={styles.detailText}>Material: PCB</Text>
        <Text style={styles.detailText}>Agreed Weight: 50 kg</Text>
        
        <TouchableOpacity style={styles.primaryButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8', padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#17201C', marginBottom: 24 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, borderColor: '#DDE5E0', borderWidth: 1 },
  titleText: { fontSize: 18, fontWeight: '700', color: '#17201C', marginBottom: 12 },
  detailText: { fontSize: 16, color: '#5F6B65', marginBottom: 8 },
  primaryButton: { backgroundColor: '#176B4D', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});