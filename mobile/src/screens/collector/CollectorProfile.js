import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function CollectorProfile() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Collector Profile
      </Text>

      <View style={styles.card}>

        <Text style={styles.name}>
          Collector
        </Text>

        <Text>
          Role: Collector
        </Text>

        <Text>
          Location: Parner
        </Text>

        <Text>
          Status: Active
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#176B4D',
    marginBottom: 15
  }
});