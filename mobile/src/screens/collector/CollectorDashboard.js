import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function CollectorDashboard({ navigation }) {

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Collector Dashboard</Text>

      <Text style={styles.subtitle}>
        Manage your scrap pickups
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Incoming Requests</Text>
        <Text style={styles.number}>5</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('IncomingRequests')}
        >
          <Text style={styles.buttonText}>View Requests</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Active Pickups</Text>
        <Text style={styles.number}>2</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MyPickups')}
        >
          <Text style={styles.buttonText}>View Pickups</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Earnings</Text>
        <Text style={styles.amount}>₹1,920</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Earnings')}
        >
          <Text style={styles.buttonText}>View Earnings</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#17201C'
  },

  subtitle: {
    fontSize: 15,
    color: '#5F6B65',
    marginBottom: 20
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDE5E0'
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#17201C'
  },

  number: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#176B4D',
    marginVertical: 10
  },

  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#176B4D',
    marginVertical: 10
  },

  button: {
    backgroundColor: '#176B4D',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});