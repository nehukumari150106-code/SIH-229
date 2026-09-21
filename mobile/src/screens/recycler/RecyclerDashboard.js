import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RecyclerDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Recycler Dashboard</Text>
      
      {/* Metrics Row */}
      <View style={styles.metricsContainer}>
        <Text style={styles.metricText}>Available Lots: 12</Text>
        <Text style={styles.metricText}>My Offers: 4</Text>
        <Text style={styles.metricText}>Pending Handovers: 2</Text>
      </View>

      {/* Primary Actions */}
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('AvailableLots')}
      >
        <Text style={styles.buttonText}>View Available Lots</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('MakeOffer')}
      >
        <Text style={styles.secondaryButtonText}>Submit Offer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8', // Shared Background Color
    padding: 16, // 8px spacing system
  },
  pageTitle: {
    fontSize: 24, // Suggested page title size
    fontWeight: '700',
    color: '#17201C', // Main Text color
    marginBottom: 24,
  },
  metricsContainer: {
    backgroundColor: '#FFFFFF', // Surface/Card color
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderColor: '#DDE5E0',
    borderWidth: 1,
  },
  metricText: {
    fontSize: 16,
    color: '#5F6B65', // Secondary Text
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#176B4D', // Primary Color
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#E8F5EF', // Primary Light
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#176B4D',
    fontSize: 16,
    fontWeight: '600',
  }
});