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

const Inventory = ({route, navigation}) => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const selectedLot = route?.params?.lot;

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${BACKEND_URL}/lots`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Failed to load inventory',
        );
      }

      console.log('Aggregator inventory lots:', data);

      setLots(data);
    } catch (err) {
      console.error('Load Inventory Error:', err);

      setError(
        err.message || 'Unable to load inventory.',
      );
    } finally {
      setLoading(false);
    }
  };

  const totalWeight = lots.reduce(
    (total, lot) =>
      total + Number(lot.actual_weight_kg || 0),
    0,
  );

  const categories = new Set(
    lots.map(lot => lot.material_category),
  );

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          Inventory
        </Text>

        <Text style={styles.headerSubtitle}>
          Current material stock
        </Text>

      </View>

      <View style={styles.content}>

        {/* Loading */}
        {loading && (
          <View
            style={{
              padding: 20,
              alignItems: 'center',
            }}>

            <ActivityIndicator size="large" />

            <Text style={{marginTop: 10}}>
              Loading inventory...
            </Text>

          </View>
        )}

        {/* Error */}
        {!loading && error !== '' && (
          <View style={{padding: 20}}>

            <Text style={{color: '#C62828'}}>
              {error}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={loadInventory}>

              <Text style={styles.buttonText}>
                Retry
              </Text>

            </TouchableOpacity>

          </View>
        )}

        {/* Statistics */}
        {!loading && error === '' && (
          <>
            <View style={styles.statsContainer}>

              <View style={styles.statCard}>

                <Text style={styles.statTitle}>
                  Total Inventory
                </Text>

                <Text style={styles.statValue}>
                  {totalWeight.toFixed(1)} kg
                </Text>

              </View>

              <View style={styles.statCard}>

                <Text style={styles.statTitle}>
                  Categories
                </Text>

                <Text style={styles.statValue}>
                  {categories.size}
                </Text>

              </View>

            </View>

            {/* Selected Lot */}
            {selectedLot && (
              <View style={styles.card}>

                <Text style={styles.cardTitle}>
                  Recently Added Lot
                </Text>

                <Text style={styles.cardText}>
                  LOT-{selectedLot.id}
                </Text>

                <Text style={styles.cardText}>
                  {getMaterialLabel(
                    selectedLot.material_category,
                  )}
                </Text>

                <Text style={styles.cardText}>
                  Weight:{' '}
                  {selectedLot.actual_weight_kg} kg
                </Text>

              </View>
            )}

            {/* Empty Inventory */}
            {lots.length === 0 && (
              <View style={styles.card}>

                <Text style={styles.cardTitle}>
                  No Inventory
                </Text>

                <Text style={styles.cardText}>
                  No Lots are currently available.
                </Text>

              </View>
            )}

            {/* Real Inventory Lots */}
            {lots.map(lot => {

              const percentage =
                totalWeight > 0
                  ? (
                      (Number(lot.actual_weight_kg) /
                        totalWeight) *
                      100
                    ).toFixed(0)
                  : 0;

              return (
                <View
                  style={styles.card}
                  key={String(lot.id)}>

                  <View style={styles.inventoryRow}>

                    <View style={{flex: 1}}>

                      <Text style={styles.material}>
                        {getMaterialLabel(
                          lot.material_category,
                        )}
                      </Text>

                      <Text
                        style={[
                          styles.cardText,
                          {marginTop: 4},
                        ]}>

                        LOT-{lot.id}
                      </Text>

                      <View style={styles.row}>

                        <View
                          style={
                            styles.progressBackground
                          }>

                          <View
                            style={[
                              styles.progress,
                              {
                                width: `${percentage}%`,
                              },
                            ]}
                          />

                        </View>

                        <Text
                          style={
                            styles.inventoryWeight
                          }>

                          {lot.actual_weight_kg} kg
                        </Text>

                      </View>

                      <Text
                        style={[
                          styles.cardText,
                          {marginTop: 6},
                        ]}>

                        Status:{' '}
                        {lot.status?.toUpperCase()}

                      </Text>

                    </View>

                  </View>

                </View>
              );
            })}

            {/* Refresh */}
            <TouchableOpacity
              style={styles.button}
              onPress={loadInventory}>

              <Text style={styles.buttonText}>
                Refresh Inventory
              </Text>

            </TouchableOpacity>

          </>
        )}

      </View>

    </ScrollView>
  );
};

export default Inventory;