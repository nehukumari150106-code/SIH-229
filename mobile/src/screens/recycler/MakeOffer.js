import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function MakeOffer({ route, navigation }) {
  const lot = route?.params?.lot || { lot_id: 'LOT-1024', weight: '25 kg', material: 'PCB' };
  const [offerPrice, setOfferPrice] = useState('');

  const handleSubmitOffer = () => {
    if (!offerPrice) {
      Alert.alert('Error', 'Please enter a price per kg.');
      return;
    }
    Alert.alert('Success', `Offer of ₹${offerPrice}/kg submitted for ${lot.lot_id}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Make Offer</Text>
      <View style={styles.card}>
        <Text style={styles.detailText}>Lot: {lot.lot_id}</Text>
        <Text style={styles.detailText}>Material: {lot.material}</Text>
        <Text style={styles.detailText}>Weight: {lot.weight}</Text>
        
        <Text style={styles.inputLabel}>Your Offer (₹/kg):</Text>
        <TextInput 
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 400"
          value={offerPrice}
          onChangeText={setOfferPrice}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmitOffer}>
          <Text style={styles.buttonText}>Submit Offer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8', padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#17201C', marginBottom: 24 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, borderColor: '#DDE5E0', borderWidth: 1 },
  detailText: { fontSize: 16, fontWeight: '600', color: '#17201C', marginBottom: 8 },
  inputLabel: { fontSize: 14, color: '#5F6B65', marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#DDE5E0', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 24, color: '#17201C' },
  primaryButton: { backgroundColor: '#176B4D', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});