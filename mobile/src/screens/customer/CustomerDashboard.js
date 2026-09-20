import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function CustomerDashboard({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Kabadiwala Connect</Text>
      <Text style={styles.welcome}>Welcome 👋</Text>

      <Text style={styles.subtitle}>
        Give your scrap a new journey.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('CreatePickup')}
      >
        <Text style={styles.primaryButtonText}>＋ Create Pickup</Text>
      </TouchableOpacity>

      <View style={styles.cardRow}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('MyPickups')}
        >
          <Text style={styles.cardIcon}>📦</Text>
          <Text style={styles.cardTitle}>My Pickups</Text>
          <Text style={styles.cardText}>View your pickup requests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Transactions')}
        >
          <Text style={styles.cardIcon}>💰</Text>
          <Text style={styles.cardTitle}>Transactions</Text>
          <Text style={styles.cardText}>View your payments</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('CustomerProfile')}
      >
        <Text style={styles.profileText}>👤 My Profile</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#176B4D',
    marginTop: 25,
  },

  welcome: {
    fontSize: 22,
    fontWeight: '600',
    color: '#17201C',
    marginTop: 25,
  },

  subtitle: {
    fontSize: 14,
    color: '#5F6B65',
    marginTop: 6,
    marginBottom: 25,
  },

  primaryButton: {
    height: 55,
    backgroundColor: '#176B4D',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    minHeight: 150,
    elevation: 2,
  },

  cardIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#17201C',
    marginBottom: 6,
  },

  cardText: {
    fontSize: 12,
    color: '#5F6B65',
  },

  profileButton: {
    backgroundColor: '#E8F5EF',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  profileText: {
    color: '#176B4D',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomerDashboard;