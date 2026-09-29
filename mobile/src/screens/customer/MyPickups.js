import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {getCustomerCategory} from '../../constants/customerCategories';
import {fetchPickups} from '../../services/api';

function MyPickups({navigation, currentUser}) {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
      loadPickups();
    }
  }, [currentUser]);

  const loadPickups = async () => {
    try {
      const data = await fetchPickups(currentUser.id);

      console.log('Pickups for customer:', currentUser.id);
      console.log('Pickups from backend:', data);

      setPickups(data);
    } catch (error) {
      console.error('Failed to load pickups:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}>
      
      <Text style={styles.title}>My Pickups</Text>

      <Text style={styles.subtitle}>
        Track all your scrap pickup requests here.
      </Text>

      {/* Loading State */}
      {loading && (
        <Text style={styles.emptyText}>
          Loading your pickups...
        </Text>
      )}

      {/* Empty State */}
      {!loading && pickups.length === 0 && (
        <Text style={styles.emptyText}>
          You don't have any pickups yet.
        </Text>
      )}

      {/* Pickup List */}
      {!loading &&
        pickups.map(pickup => {
          const category = getCustomerCategory(
            pickup.customer_category || pickup.scrap_type,
          );

          return (
            <TouchableOpacity
              key={pickup.id}
              style={styles.pickupCard}
              onPress={() =>
                navigation.navigate('PickupDetails', {
                  pickup: pickup,
                })
              }>
              
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.material}>
                    {category.emoji} {category.label}
                    {'\n'}
                    {category.marathiLabel}
                  </Text>

                  <Text style={styles.pickupId}>
                    Pickup ID: {pickup.id}
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
                    {pickup.estimated_weight_kg} kg
                  </Text>
                </View>

                <View>
                  <Text style={styles.label}>Location</Text>
                  <Text style={styles.value}>
                    {pickup.address}
                  </Text>
                </View>

                <View>
                  <Text style={styles.label}>Time</Text>
                  <Text style={styles.value}>
                    {pickup.preferred_time || 'Not specified'}
                  </Text>
                </View>
              </View>

              <Text style={styles.viewDetails}>
                Tap to view details →
              </Text>
            </TouchableOpacity>
          );
        })}
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

  emptyText: {
    textAlign: 'center',
    color: '#5F6B65',
    fontSize: 15,
    marginTop: 40,
  },
});

export default MyPickups;