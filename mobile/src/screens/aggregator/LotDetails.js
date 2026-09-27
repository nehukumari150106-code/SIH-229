import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import styles from "./AggregatorStyles";

const LotDetails = ({ route, navigation }) => {

  const lot = route?.params?.lot || {
    id: "LOT-1024",
    material: "PCB",
    weight: "25 kg",
    collector: "Amit Shinde",
    location: "Rajur",
    status: "Received",
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lot Details</Text>
        <Text style={styles.headerSubtitle}>
          {lot.id}
        </Text>
      </View>

      <View style={styles.content}>

        <View style={styles.card}>

          <View style={styles.row}>
            <Text style={styles.cardTitle}>
              {lot.id}
            </Text>

            <Text style={styles.status}>
              {lot.status}
            </Text>
          </View>

          <Text style={styles.cardText}>
            Material
          </Text>
          <Text style={styles.material}>
            {lot.material}
          </Text>

          <Text style={styles.cardText}>
            Actual Weight
          </Text>
          <Text style={styles.material}>
            {lot.weight}
          </Text>

          <Text style={styles.cardText}>
            Collector
          </Text>
          <Text style={styles.material}>
            {lot.collector}
          </Text>

          <Text style={styles.cardText}>
            Location
          </Text>
          <Text style={styles.material}>
            {lot.location}
          </Text>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation?.navigate("Inventory")}
        >
          <Text style={styles.buttonText}>
            Add to Inventory
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
};

export default LotDetails;