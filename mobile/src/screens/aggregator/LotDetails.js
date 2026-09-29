import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
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

const LotDetails = ({route, navigation}) => {
  const lot = route?.params?.lot;

  const [loading, setLoading] = useState(false);

  if (!lot) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Lot not found
            </Text>

            <Text style={styles.cardText}>
              No Lot information was provided.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  const addToInventory = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${BACKEND_URL}/lots/${lot.id}/inventory`,
        {
          method: 'PATCH',
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Failed to add Lot to inventory',
        );
      }

      console.log(
        'Lot added to inventory:',
        data,
      );

      Alert.alert(
        'Added to Inventory',
        `LOT-${data.id} is now available in inventory.`,
        [
          {
            text: 'OK',
            onPress: () =>
              navigation?.navigate('Inventory', {
                lot: data,
              }),
          },
        ],
      );
    } catch (error) {
      console.error(
        'Add to Inventory Error:',
        error,
      );

      Alert.alert(
        'Failed',
        error.message ||
          'Unable to add Lot to inventory.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Lot Details
        </Text>

        <Text style={styles.headerSubtitle}>
          LOT-{lot.id}
        </Text>
      </View>

      <View style={styles.content}>

        <View style={styles.card}>

          <View style={styles.row}>
            <Text style={styles.cardTitle}>
              LOT-{lot.id}
            </Text>

            <Text style={styles.status}>
              {lot.status?.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.cardText}>
            Material
          </Text>

          <Text style={styles.material}>
            {getMaterialLabel(
              lot.material_category,
            )}
          </Text>

          <Text style={styles.cardText}>
            Actual Weight
          </Text>

          <Text style={styles.material}>
            {lot.actual_weight_kg} kg
          </Text>

          <Text style={styles.cardText}>
            Pickup ID
          </Text>

          <Text style={styles.material}>
            {lot.pickup_id}
          </Text>

          <Text style={styles.cardText}>
            Created At
          </Text>

          <Text style={styles.material}>
            {lot.created_at
              ? new Date(
                  lot.created_at,
                ).toLocaleString()
              : 'Not available'}
          </Text>

        </View>

        <TouchableOpacity
          style={[
            styles.button,
            loading && {opacity: 0.6},
          ]}
          disabled={loading}
          onPress={addToInventory}>

          <Text style={styles.buttonText}>
            {loading
              ? 'Adding...'
              : lot.status === 'available'
              ? 'Already in Inventory'
              : 'Add to Inventory'}
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
};

export default LotDetails;