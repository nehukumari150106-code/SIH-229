import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { getCustomerCategory } from '../../constants/customerCategories';

function MyPickups({ navigation }) {

  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPickups = async () => {
    try {
      // Replace with actual API endpoint when backend integration is ready
      // const response = await fetch('YOUR_BACKEND_URL/api/pickups');
      // const data = await response.json();

      const demoData = [
        {
          pickup_id: 'PICKUP-1789928214322',
          customer_category: 'TV_MONITOR',
          estimated_weight: 5,
          location: 'Pune',
          preferred_time: '5 PM',
          status: 'pending',
        },
        {
          pickup_id: 'PICKUP-1789928107689',
          customer_category: 'OTHER_ELECTRONICS',
          estimated_weight: 3,
          location: 'Pune',
          preferred_time: '10 AM',
          status: 'accepted',
        },
      ];
      setPickups(demoData);
    } catch (error) {
      console.error('Failed to fetch pickups:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPickups();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return { bg: '#E8F5E9', text: '#2E7D32' };
      case 'completed':
        return { bg: '#E0F2FE', text: '#0284C7' };
      case 'pending':
      default:
        return { bg: '#FFF3E0', text: '#C77700' };
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#176B4D" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#176B4D']} />
      }
    >
      <Text style={styles.title}>My Pickups</Text>
      <Text style={styles.subtitle}>
        Track all your scrap pickup requests here.
      </Text>

      {pickups.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No pickup requests found.</Text>
        </View>
      ) : (
        pickups.map((pickup) => {
          const categoryKey = pickup.customer_category || pickup.material;
          const category = getCustomerCategory(categoryKey);
          const statusStyle = getStatusColor(pickup.status);

          return (
            <TouchableOpacity
              key={pickup.pickup_id}
              style={styles.pickupCard}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('PickupTracking', {
                  pickup: pickup,
                })
              }
            >
              <View style={styles.cardTop}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.material}>
                    {category.emoji} {category.label}
                  </Text>
                  {category.marathiLabel ? (
                    <Text style={styles.marathiLabel}>{category.marathiLabel}</Text>
                  ) : null}
                  <Text style={styles.pickupId}>{pickup.pickup_id}</Text>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>
                    {pickup.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.label}>Weight</Text>
                  <Text style={styles.value}>{pickup.estimated_weight} kg</Text>
                </View>

                <View>
                  <Text style={styles.label}>Location</Text>
                  <Text style={styles.value}>{pickup.location}</Text>
                </View>

                <View>
                  <Text style={styles.label}>Time</Text>
                  <Text style={styles.value}>{pickup.preferred_time}</Text>
                </View>
              </View>

              <Text style={styles.viewDetails}>
                Tap to view details →
              </Text>
            </TouchableOpacity>
          );
        })
      )}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9F8',
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
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#5F6B65',
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
  categoryInfo: {
    flex: 1,
  },
  material: {
    fontSize: 18,
    fontWeight: '700',
    color: '#17201C',
  },
  marathiLabel: {
    fontSize: 13,
    color: '#5F6B65',
    marginTop: 2,
  },
  pickupId: {
    fontSize: 11,
    color: '#5F6B65',
    marginTop: 5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
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
