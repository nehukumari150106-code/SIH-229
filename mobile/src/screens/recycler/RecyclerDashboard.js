import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function RecyclerDashboard({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Recycler Dashboard</Text>
      
      {/* Metrics Row */}
      <View style={styles.metricsContainer}>
        <Text style={styles.metricText}>Available Lots: 12</Text>
        <Text style={styles.metricText}>My Offers: 4</Text>
        <Text style={styles.metricText}>Pending Handovers: 2</Text>
      </View>

      {/* Primary Action */}
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('AvailableLots')}
      >
        <Text style={styles.buttonText}>View Available Lots</Text>
      </TouchableOpacity>

      {/* Secondary Actions */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('MyOffers')}
        >
          <Text style={styles.secondaryButtonText}>My Offers</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Handover')}
        >
          <Text style={styles.secondaryButtonText}>Handover</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Transactions')}
        >
          <Text style={styles.secondaryButtonText}>Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('RecyclerProfile')}
        >
          <Text style={styles.secondaryButtonText}>My Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8', padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#17201C', marginBottom: 24 },
  metricsContainer: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, marginBottom: 24, borderColor: '#DDE5E0', borderWidth: 1 },
  metricText: { fontSize: 16, color: '#5F6B65', marginBottom: 8 },
  primaryButton: { backgroundColor: '#176B4D', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  buttonGrid: { gap: 12 },
  secondaryButton: { backgroundColor: '#E8F5EF', padding: 16, borderRadius: 8, alignItems: 'center' },
  secondaryButtonText: { color: '#176B4D', fontSize: 16, fontWeight: '600' }
});