import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import styles from './aggregatorstyles';

const BACKEND_URL = 'http://127.0.0.1:8000';

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

const IncomingLots = ({navigation}) => {
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

      const response = await fetch(`${BACKEND_URL}/lots`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Failed to load lots',
        );
      }

      console.log('Aggregator lots:', data);

      setLots(data);
    } catch (err) {
      console.error('Load Lots Error:', err);
      setError(
        err.message || 'Unable to load incoming lots.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Incoming Lots
        </Text>

        <Text style={styles.headerSubtitle}>
          Lots received from collectors
        </Text>
      </View>

      <View style={styles.content}>

        {loading && (
          <View style={{padding: 20, alignItems: 'center'}}>
            <ActivityIndicator size="large" />
            <Text style={{marginTop: 10}}>
              Loading lots...
            </Text>
          </View>
        )}

        {!loading && error !== '' && (
          <View style={{padding: 20}}>
            <Text style={{color: '#C62828'}}>
              {error}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={loadLots}>
              <Text style={styles.buttonText}>
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && error === '' && lots.length === 0 && (
          <View style={{padding: 20}}>
            <Text>
              No incoming lots available.
            </Text>
          </View>
        )}

        {!loading &&
          error === '' &&
          lots.map(lot => (
            <View
              style={styles.card}
              key={String(lot.id)}>

              <View style={styles.row}>

                <Text style={styles.cardTitle}>
                  LOT-{lot.id}
                </Text>

                <Text style={styles.status}>
                  {lot.status?.toUpperCase()}
                </Text>

              </View>

              <Text style={styles.cardText}>
                Material:{' '}
                {getMaterialLabel(
                  lot.material_category,
                )}
              </Text>

              <Text style={styles.cardText}>
                Weight: {lot.actual_weight_kg} kg
              </Text>

              <Text style={styles.cardText}>
                Pickup ID: {lot.pickup_id}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation?.navigate(
                    'LotDetails',
                    {
                      lot: lot,
                    },
                  )
                }>
                <Text style={styles.buttonText}>
                  View Details
                </Text>
              </TouchableOpacity>

            </View>
          ))}

      </View>

    </ScrollView>
  );
};

export default IncomingLots;