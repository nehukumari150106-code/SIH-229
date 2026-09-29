import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import {getPickups} from '../../services/collectorApi';
import {getCustomerCategory} from '../../constants/customerCategories';

export default function IncomingRequests({navigation}) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);

      const data = await getPickups();

      console.log('Collector pickups from backend:', data);

      setRequests(data);
    } catch (error) {
      console.error('Failed to load collector requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderRequest = ({item}) => {
    const category = getCustomerCategory(item.scrap_type);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('PickupDetails', {
            pickup: item,
          })
        }> 
        {/* Category */}
        <Text style={styles.material}>
          {category.emoji} {category.label}
        </Text>

        <Text style={styles.marathi}>
          {category.marathiLabel}
        </Text>

        {/* Pickup ID */}
        <Text style={styles.pickupId}>
          Pickup ID: {item.id}
        </Text>

        {/* Weight */}
        <Text style={styles.info}>
          Estimated Weight: {item.estimated_weight_kg} kg
        </Text>

        {/* Location */}
        <Text style={styles.info}>
          Location: {item.address}
        </Text>

        {/* Preferred Time */}
        <Text style={styles.info}>
          Preferred Time: {item.preferred_time || 'Not specified'}
        </Text>

        {/* Status */}
        <Text style={styles.status}>
          {item.status?.toUpperCase() || 'PENDING'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Incoming Requests
      </Text>

      {loading && (
        <Text style={styles.message}>
          Loading pickup requests...
        </Text>
      )}

      {!loading && requests.length === 0 && (
        <Text style={styles.message}>
          No pickup requests available.
        </Text>
      )}

      {!loading && requests.length > 0 && (
        <FlatList
          data={requests}
          keyExtractor={item => String(item.id)}
          renderItem={renderRequest}
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
    padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#176B4D',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDE5E0',
    elevation: 2,
  },

  material: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#176B4D',
    marginBottom: 2,
  },

  marathi: {
    fontSize: 13,
    color: '#5F6B65',
    marginBottom: 6,
  },

  pickupId: {
    fontSize: 12,
    color: '#5F6B65',
    marginBottom: 10,
  },

  info: {
    fontSize: 14,
    color: '#17201C',
    marginBottom: 5,
  },

  status: {
    marginTop: 8,
    color: '#C77700',
    fontWeight: 'bold',
    fontSize: 13,
  },

  message: {
    textAlign: 'center',
    marginTop: 40,
    color: '#5F6B65',
    fontSize: 15,
  },
});