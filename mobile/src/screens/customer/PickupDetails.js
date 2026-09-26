import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { getCustomerCategory } from '../../constants/customerCategories';

function PickupDetails({ navigation, route }) {
  const pickup = route?.params?.pickup || {
    pickup_id: 'PICKUP-123456',
    customer_category: 'OTHER_ELECTRONICS',
    estimated_weight: 5,
    location: 'Your saved location',
    preferred_time: '10:00 AM - 12:00 PM',
    status: 'pending',
  };

  const category = getCustomerCategory(pickup.customer_category);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pickup Details</Text>
      <Text style={styles.subtitle}>Your pickup request has been processed.</Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Pickup Status</Text>
        <Text style={styles.statusText}>{pickup.status.toUpperCase()}</Text>
      </View>

      {pickup.photo_url && (
        <View style={styles.imageCard}>
          <Image source={{ uri: pickup.photo_url }} style={styles.pickupImage} />
        </View>
      )}

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Pickup Information</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Pickup ID</Text>
          <Text style={styles.value}>{pickup.pickup_id}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Scrap Category (AI Classified)</Text>
          <Text style={styles.value}>
            {category.emoji} {category.label} ({category.marathiLabel})
          </Text>
          {pickup.category_confidence && (
            <Text style={styles.subText}>
              Confidence: {(pickup.category_confidence * 100).toFixed(1)}%
            </Text>
          )}
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Estimated Weight</Text>
          <Text style={styles.value}>{pickup.estimated_weight} kg</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{pickup.location}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Preferred Time</Text>
          <Text style={styles.value}>{pickup.preferred_time}</Text>
        </View>

        {pickup.matched_collector && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Matched Collector</Text>
            <Text style={styles.value}>{pickup.matched_collector.name}</Text>
          </View>
        )}
      </View>

      <Text style={styles.note}>
        A collector will review and accept your pickup request soon.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PickupTracking', { pickup })}
      >
        <Text style={styles.buttonText}>Track Pickup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', lineHeight: 22, marginBottom: 24 },
  statusCard: {
    backgroundColor: '#FFF7E6',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
  },
  statusLabel: { fontSize: 14, color: '#92400E', marginBottom: 5 },
  statusText: { fontSize: 20, fontWeight: 'bold', color: '#D97706' },
  imageCard: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 18,
  },
  pickupImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  detailsCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 18, elevation: 2 },
  cardTitle: { fontSize: 19, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  detailRow: { borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingVertical: 14 },
  label: { fontSize: 13, color: '#6B7280', marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  subText: { fontSize: 12, color: '#16A34A', marginTop: 2 },
  note: { fontSize: 14, lineHeight: 20, color: '#6B7280', textAlign: 'center', marginVertical: 24 },
  button: { backgroundColor: '#16A34A', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default PickupDetails;
