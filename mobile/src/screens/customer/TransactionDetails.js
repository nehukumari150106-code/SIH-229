import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getCustomerCategory } from '../../constants/customerCategories';

function TransactionDetails({ navigation, route }) {

  const transaction = route?.params?.transaction || {
    transaction_id: 'TRX-001',
    customer_category: 'TV_MONITOR',
    actual_weight: 5,
    price: 90,
    total_amount: 450,
    status: 'paid',
    date: '21 Sep 2026',
  };
  const category = getCustomerCategory(
    transaction.customer_category || transaction.material,
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.title}>Transaction Details</Text>

      <Text style={styles.subtitle}>
        Complete information about your scrap transaction.
      </Text>

      {/* Payment Status */}
      <View style={styles.statusCard}>

        <Text style={styles.statusLabel}>
          Payment Status
        </Text>

        <Text style={styles.statusText}>
          {transaction.status.toUpperCase()}
        </Text>

      </View>

      {/* Transaction Information */}
      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Transaction Information
        </Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>
            {transaction.transaction_id}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Product Category</Text>
          <Text style={styles.value}>
            {category.emoji} {category.label}{'\n'}{category.marathiLabel}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Actual Weight</Text>
          <Text style={styles.value}>
            {transaction.actual_weight} kg
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.value}>
            ₹{transaction.price} / kg
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Transaction Date</Text>
          <Text style={styles.value}>
            {transaction.date}
          </Text>
        </View>

      </View>

      {/* Total Amount */}
      <View style={styles.totalCard}>

        <Text style={styles.totalLabel}>
          Total Amount
        </Text>

        <Text style={styles.totalAmount}>
          ₹{transaction.total_amount}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Transactions')}
      >
        <Text style={styles.buttonText}>
          Back to Transactions
        </Text>
      </TouchableOpacity>

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

  statusCard: {
    backgroundColor: '#E8F5EF',
    borderWidth: 1,
    borderColor: '#B9D9CB',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
  },

  statusLabel: {
    fontSize: 13,
    color: '#5F6B65',
    marginBottom: 5,
  },

  statusText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    elevation: 3,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#17201C',
    marginBottom: 8,
  },

  detailRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAE7',
    paddingVertical: 14,
  },

  label: {
    fontSize: 13,
    color: '#5F6B65',
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17201C',
  },

  totalCard: {
    backgroundColor: '#176B4D',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  totalAmount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  button: {
    height: 52,
    backgroundColor: '#176B4D',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TransactionDetails;
