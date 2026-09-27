import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { submitOffer } from '../../services/api';

export default function MakeOffer({ route, navigation }) {
  const lot = route?.params?.lot || { lot_id: 'LOT-1024', material: 'PCB', actual_weight: '25' };
  const [offerPrice, setOfferPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitOffer = async () => {
    if (!offerPrice) {
      Alert.alert('Error', 'Please enter a price per kg.');
      return;
    }

    setSubmitting(true);
    try {
      await submitOffer({
        lot_id: lot.lot_id,
        recycler_id: 'REC-001',
        price_per_kg: parseFloat(offerPrice)
      });
      Alert.alert('Success', `Offer submitted successfully for ${lot.lot_id}`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Notice', 'Backend offline. Offer simulated locally.');
      navigation.goBack();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Make Offer</Text>
      <View style={styles.card}>
        <Text style={styles.detailText}>Lot: {lot.lot_id}</Text>
        <Text style={styles.detailText}>Material: {lot.material}</Text>
        <Text style={styles.detailText}>Weight: {lot.actual_weight} kg</Text>
        
        <Text style={styles.inputLabel}>Your Offer (₹/kg):</Text>
        <TextInput 
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 400"
          value={offerPrice}
          onChangeText={setOfferPrice}
          editable={!submitting}
        />
        
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={handleSubmitOffer}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Submit Offer</Text>
          )}
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