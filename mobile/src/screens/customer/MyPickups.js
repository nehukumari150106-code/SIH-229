import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

function MyPickups({ navigation }) {

  // Demo pickup data for now.
  // Later this will come from the backend.
  const pickups = [
    {
      pickup_id: 'PICKUP-1789928214322',
      material: 'LCD',
      estimated_weight: 5,
      location: 'Pune',
      preferred_time: '5 PM',
      status: 'pending',
    },
    {
      pickup_id: 'PICKUP-1789928107689',
      material: 'PCB',
      estimated_weight: 3,
      location: 'Pune',
      preferred_time: '10 AM',
      status: 'accepted',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.title}>My Pickups</Text>

      <Text style={styles.subtitle}>
        Track all your scrap pickup requests here.
      </Text>

      {pickups.map((pickup) => (
        <TouchableOpacity
          key={pickup.pickup_id}
          style={styles.pickupCard}
          onPress={() =>
            navigation.navigate('PickupDetails', {
              pickup: pickup,
            })
          }
        >

          <View style={styles.cardTop}>
            <View>
              <Text style={styles.material}>
                {pickup.material}
              </Text>

              <Text style={styles.pickupId}>
                {pickup.pickup_id}
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {pickup.status.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>
                {pickup.estimated_weight} kg
              </Text>
            </View>

            <View>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>
                {pickup.location}
              </Text>
            </View>

            <View>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>
                {pickup.preferred_time}
              </Text>
            </View>
          </View>

          <Text style={styles.viewDetails}>
            Tap to view details →
          </Text>

        </TouchableOpacity>
      ))}

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

  pickupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  material: {
    fontSize: 20,
    fontWeight: '700',
    color: '#17201C',
  },

  pickupId: {
    fontSize: 11,
    color: '#5F6B65',
    marginTop: 5,
  },

  statusBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C77700',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5EAE7',
    marginVertical: 16,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 12,
    color: '#5F6B65',
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#17201C',
  },

  viewDetails: {
    fontSize: 13,
    fontWeight: '600',
    color: '#176B4D',
    marginTop: 16,
    textAlign: 'right',
  },
});

export default MyPickups;