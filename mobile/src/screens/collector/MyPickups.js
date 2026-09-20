import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

import { getPickups } from '../../services/collectorApi';

export default function MyPickups() {

  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    loadPickups();
  }, []);

  const loadPickups = async () => {

    try {

      const data = await getPickups();

      setPickups(
        data.filter(
          item =>
            item.status === 'accepted' ||
            item.status === 'on_the_way' ||
            item.status === 'collected' ||
            item.status === 'completed'
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        My Pickups
      </Text>

      <FlatList
        data={pickups}
        keyExtractor={(item) => item.pickup_id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.material}>
              {item.material}
            </Text>

            <Text>
              {item.location}
            </Text>

            <Text>
              Estimated: {item.estimated_weight} kg
            </Text>

            <Text style={styles.status}>
              {item.status}
            </Text>

          </View>

        )}
      />

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
    marginBottom: 15
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12
  },

  material: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#176B4D'
  },

  status: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#176B4D'
  }
});