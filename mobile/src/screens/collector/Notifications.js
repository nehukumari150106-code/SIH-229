import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function Notifications() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Notifications
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>
          New Pickup Request
        </Text>

        <Text>
          A new PCB pickup request is available in Parner.
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
    padding: 18,
    borderRadius: 10
  },

  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8
  }
});