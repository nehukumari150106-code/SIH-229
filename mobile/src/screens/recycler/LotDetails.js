import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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

export default function LotDetails({route, navigation}) {
  const lot = route?.params?.lot;

  if (!lot) {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          Lot Details
        </Text>

        <View style={styles.card}>
          <Text style={styles.titleText}>
            Lot not found
          </Text>

          <Text style={styles.label}>
            No Lot information was provided.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.pageTitle}>
        Lot Details
      </Text>

      <View style={styles.card}>

        {/* Material */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>
            {getMaterialLabel(
              lot.material_category,
            )}
          </Text>
        </View>

        {/* Lot ID */}
        <Text style={styles.titleText}>
          LOT-{lot.id}
        </Text>

        {/* Material */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Material:
          </Text>

          <Text style={styles.value}>
            {getMaterialLabel(
              lot.material_category,
            )}
          </Text>
        </View>

        {/* Actual Weight */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Actual Weight:
          </Text>

          <Text style={styles.value}>
            {lot.actual_weight_kg} kg
          </Text>
        </View>

        {/* Pickup ID */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Pickup ID:
          </Text>

          <Text style={styles.value}>
            {lot.pickup_id}
          </Text>
        </View>

        {/* Status */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Status:
          </Text>

          <Text style={styles.successText}>
            {lot.status?.toUpperCase()}
          </Text>
        </View>

        {/* Created At */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Added:
          </Text>

          <Text style={styles.value}>
            {lot.created_at
              ? new Date(
                  lot.created_at,
                ).toLocaleString()
              : 'Not available'}
          </Text>
        </View>

        {/* Make Offer */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            navigation.navigate(
              'MakeOffer',
              {
                lot: lot,
              },
            )
          }>

          <Text style={styles.buttonText}>
            Make Offer
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 16,
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
    borderColor: '#DDE5E0',
    borderWidth: 1,
    elevation: 2,
  },

  imagePlaceholder: {
    height: 150,
    backgroundColor: '#E8F5EF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  imageText: {
    color: '#176B4D',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },

  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#17201C',
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },

  label: {
    fontSize: 16,
    color: '#5F6B65',
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17201C',
    flexShrink: 1,
    textAlign: 'right',
  },

  successText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    textTransform: 'capitalize',
  },

  primaryButton: {
    backgroundColor: '#176B4D',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});