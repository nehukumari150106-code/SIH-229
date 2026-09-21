import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

function CustomerProfile({ navigation }) {

  const customer = {
    name: 'Customer',
    mobile: '+91 98765 43210',
    location: 'Pune',
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.title}>My Profile</Text>

      <Text style={styles.subtitle}>
        Manage your customer information.
      </Text>

      {/* Profile Header */}
      <View style={styles.profileCard}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {customer.name}
          </Text>

          <Text style={styles.mobile}>
            {customer.mobile}
          </Text>
        </View>

      </View>

      {/* Personal Information */}
      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Personal Information
        </Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {customer.name}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Mobile Number</Text>
          <Text style={styles.value}>
            {customer.mobile}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Saved Location</Text>
          <Text style={styles.value}>
            {customer.location}
          </Text>
        </View>

      </View>

      {/* Customer Actions */}
      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          My Activity
        </Text>

        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => navigation.navigate('MyPickups')}
        >
          <Text style={styles.actionIcon}>♻️</Text>

          <Text style={styles.actionText}>
            My Pickups
          </Text>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => navigation.navigate('Transactions')}
        >
          <Text style={styles.actionIcon}>💰</Text>

          <Text style={styles.actionText}>
            Transactions
          </Text>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CustomerDashboard')}
      >
        <Text style={styles.buttonText}>
          Back to Dashboard
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#176B4D',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#5F6B65',
    marginTop: 6,
    marginBottom: 22,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 18,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#E8F5EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 30,
  },

  profileInfo: {
    marginLeft: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#17201C',
  },

  mobile: {
    fontSize: 13,
    color: '#5F6B65',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    elevation: 3,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#17201C',
    marginBottom: 8,
  },

  detailRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAE7',
    paddingVertical: 14,
  },

  label: {
    fontSize: 13,
    color: '#5F6B65',
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17201C',
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAE7',
  },

  actionIcon: {
    fontSize: 21,
    width: 38,
  },

  actionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#17201C',
  },

  arrow: {
    fontSize: 26,
    color: '#176B4D',
  },

  button: {
    height: 52,
    backgroundColor: '#176B4D',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomerProfile;