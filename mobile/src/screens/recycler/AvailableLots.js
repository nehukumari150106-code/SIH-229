import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {fetchAvailableLots} from '../../services/api';

const getMaterialLabel = material => {
  const categories = {
    TV_MONITOR: '📺 TV / Monitor',
    MOBILE_TABLET: '📱 Mobile / Tablet',
    COMPUTER_LAPTOP: '💻 Computer / Laptop',
    FRIDGE_AC: '🧊 Fridge / AC',
    WASHING_APPLIANCE: '🧺 Washing Machine / Appliance',
    CABLE_WIRE: '🔌 Wire / Cable / Charger',
    OTHER_ELECTRONICS: '📦 Other Electronics',
    NOT_SURE: '❓ Other / Not Sure',
  };

  return categories[material] || material;
};

export default function AvailableLots({navigation}) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadLots();
  }, []);

  const loadLots = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await fetchAvailableLots();

      console.log('Recycler lots from backend:', data);

      // Recycler should only see Lots that are
      // available in Aggregator inventory.
      const availableLots = data.filter(
        lot => lot.status === 'available',
      );

      setLots(availableLots);
    } catch (error) {
      console.error(
        'Load Available Lots Error:',
        error,
      );

      setError(
        error.message ||
          'Unable to load available Lots.',
      );
    } finally {
      setLoading(false);
    }
  };

  const renderLotCard = ({item}) => (
    <View style={styles.card}>

      <View style={styles.cardHeader}>

        <Text style={styles.materialText}>
          {getMaterialLabel(
            item.material_category,
          )}
        </Text>

        <Text style={styles.weightText}>
          {item.actual_weight_kg} kg
        </Text>

      </View>

      <Text style={styles.detailText}>
        Lot ID: LOT-{item.id}
      </Text>

      <Text style={styles.detailText}>
        Pickup ID: {item.pickup_id}
      </Text>

      <Text style={styles.statusText}>
        Available
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() =>
          navigation.navigate(
            'LotDetails',
            {
              lot: item,
            },
          )
        }>

        <Text style={styles.buttonText}>
          View Details
        </Text>

      </TouchableOpacity>

    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          styles.center,
        ]}>

        <ActivityIndicator
          size="large"
          color="#176B4D"
        />

        <Text style={styles.loadingText}>
          Loading available Lots...
        </Text>

      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          styles.center,
        ]}>

        <Text style={styles.errorText}>
          {error}
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={loadLots}>

          <Text style={styles.buttonText}>
            Retry
          </Text>

        </TouchableOpacity>

      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.pageTitle}>
        Available Lots
      </Text>

      {lots.length === 0 ? (
        <View style={styles.emptyContainer}>

          <Text style={styles.emptyTitle}>
            No Lots Available
          </Text>

          <Text style={styles.emptyText}>
            There are currently no Lots available
            for recycling.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={loadLots}>

            <Text style={styles.buttonText}>
              Refresh
            </Text>

          </TouchableOpacity>

        </View>
      ) : (
        <FlatList
          data={lots}
          keyExtractor={item =>
            String(item.id)
          }
          renderItem={renderLotCard}
          showsVerticalScrollIndicator={false}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 16,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#17201C',
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#DDE5E0',
    borderWidth: 1,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  materialText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17201C',
    flex: 1,
    marginRight: 10,
  },

  weightText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5F6B65',
  },

  detailText: {
    fontSize: 14,
    color: '#5F6B65',
    marginBottom: 4,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 6,
  },

  primaryButton: {
    backgroundColor: '#176B4D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  loadingText: {
    marginTop: 10,
    color: '#5F6B65',
  },

  errorText: {
    color: '#C62828',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },

  emptyContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDE5E0',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#17201C',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#5F6B65',
    textAlign: 'center',
  },
});