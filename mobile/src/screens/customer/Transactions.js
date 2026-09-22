import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

function Transactions({ navigation }) {

  // Demo transaction data for now.
  // Later this will come from the backend.
  const transactions = [
    {
  transaction_id: 'TRX-001',
  material: 'LCD',
  actual_weight: 5,
  price: 90,
  total_amount: 450,
  payment_method: 'UPI',
  status: 'paid',
  date: '21 Sep 2026',
},
    {
      transaction_id: 'TRX-002',
      material: 'PCB',
      actual_weight: 3,
      price: 120,
      total_amount: 360,
      payment_method:'Cash',
      status: 'paid',
      date: '18 Sep 2026',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.title}>Transactions</Text>

      <Text style={styles.subtitle}>
        View your scrap sales and payment history.
      </Text>

      {transactions.map((transaction) => (
        <TouchableOpacity
          key={transaction.transaction_id}
          style={styles.transactionCard}
          onPress={() =>
            navigation.navigate('TransactionDetails', {
              transaction: transaction,
            })
          }
        >

          <View style={styles.cardTop}>

            <View>
              <Text style={styles.material}>
                {transaction.material}
              </Text>

              <Text style={styles.transactionId}>
                {transaction.transaction_id}
              </Text>
            </View>

            <View style={styles.paidBadge}>
              <Text style={styles.paidText}>
                {transaction.status.toUpperCase()}
              </Text>
            </View>

          </View>

          <View style={styles.divider} />

          <View style={styles.amountRow}>

            <View>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>
                {transaction.actual_weight} kg
              </Text>
            </View>

            <View>
              <Text style={styles.label}>Rate</Text>
              <Text style={styles.value}>
                ₹{transaction.price}/kg
              </Text>
            </View>

            <View>
              <Text style={styles.label}>Total</Text>
              <Text style={styles.amount}>
                ₹{transaction.total_amount}
              </Text>
            </View>

          </View>
          <View style={styles.paymentRow}>
  <Text style={styles.paymentLabel}>Paid Via</Text>

  <Text style={styles.paymentValue}>
    {transaction.payment_method}
  </Text>
</View>

          <View style={styles.bottomRow}>
            <Text style={styles.date}>
              {transaction.date}
            </Text>

            <Text style={styles.details}>
              View Details →
            </Text>
          </View>

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
  paymentRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 14,
},

paymentLabel: {
  fontSize: 12,
  color: '#5F6B65',
  marginRight: 6,
},

paymentValue: {
  fontSize: 13,
  fontWeight: '600',
  color: '#17201C',
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

  transactionCard: {
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

  transactionId: {
    fontSize: 11,
    color: '#5F6B65',
    marginTop: 5,
  },

  paidBadge: {
    backgroundColor: '#E8F5EF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  paidText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E7D32',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5EAE7',
    marginVertical: 16,
  },

  amountRow: {
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

  amount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#176B4D',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },

  date: {
    fontSize: 12,
    color: '#7A847F',
  },

  details: {
    fontSize: 13,
    fontWeight: '600',
    color: '#176B4D',
  },
});

export default Transactions;