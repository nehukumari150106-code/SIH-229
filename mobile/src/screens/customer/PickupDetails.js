import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

function PickupDetails({ navigation, route }) {
  // This will receive the real pickup later from CreatePickup.
  // Demo data keeps the screen visible while we build and test it.
  const pickup = route?.params?.pickup || {
    pickup_id: 'PICKUP-123456',
    material: 'PCB',
    estimated_weight: 5,
    location: 'Your saved location',
    preferred_time: '10:00 AM - 12:00 PM',
    status: 'pending',
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Pickup Details</Text>

      <Text style={styles.subtitle}>
        Your pickup request has been created successfully.
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Pickup Status</Text>
        <Text style={styles.statusText}>
          {pickup.status.toUpperCase()}
        </Text>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Pickup Information</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Pickup ID</Text>
          <Text style={styles.value}>{pickup.pickup_id}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Scrap Category</Text>
          <Text style={styles.value}>{pickup.material}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Estimated Weight</Text>
          <Text style={styles.value}>
            {pickup.estimated_weight} kg
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{pickup.location}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Preferred Time</Text>
          <Text style={styles.value}>{pickup.preferred_time}</Text>
        </View>
      </View>

      <Text style={styles.note}>
        A collector will review and accept your pickup request soon.
      </Text>
<TouchableOpacity
  style={styles.button}
  onPress={() =>
    navigation.navigate('PickupTracking', {
      pickup: pickup,
    })
  }
>
  <Text style={styles.buttonText}>Track Pickup</Text>
</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 24,
  },
  statusCard: {
    backgroundColor: '#FFF7E6',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
  },
  statusLabel: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D97706',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  detailRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 14,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  note: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 24,
  },
  button: {
    backgroundColor: '#16A34A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PickupDetails;