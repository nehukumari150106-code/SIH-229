import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

import { getPickups } from '../../services/collectorApi';

export default function IncomingRequests({ navigation }) {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getPickups();
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderRequest = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('PickupDetails', {
          pickup: item
        })
      }
    >

      <Text style={styles.material}>
        {item.material}
      </Text>

      <Text>
        Estimated Weight: {item.estimated_weight} kg
      </Text>

      <Text>
        Location: {item.location}
      </Text>

      <Text style={styles.status}>
        {item.status}
      </Text>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Incoming Requests
      </Text>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.pickup_id}
        renderItem={renderRequest}
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
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDE5E0'
  },

  material: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#176B4D',
    marginBottom: 8
  },

  status: {
    marginTop: 8,
    color: '#C77700',
    fontWeight: 'bold'
  }
});