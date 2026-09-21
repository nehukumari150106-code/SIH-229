import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import styles from "./AggregatorStyles";

const lots = [
  {
    id: "LOT-1024",
    material: "PCB",
    weight: "25 kg",
    collector: "Amit Shinde",
    location: "Rajur",
    status: "Received",
  },
  {
    id: "LOT-1025",
    material: "Cable",
    weight: "40 kg",
    collector: "Suresh Pawar",
    location: "Parner",
    status: "Received",
  },
  {
    id: "LOT-1026",
    material: "Motor",
    weight: "18 kg",
    collector: "Rahul Jadhav",
    location: "Shirur",
    status: "Processing",
  },
];

const IncomingLots = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Incoming Lots</Text>
        <Text style={styles.headerSubtitle}>
          Lots received from collectors
        </Text>
      </View>

      <View style={styles.content}>

        {lots.map((lot) => (
          <View style={styles.card} key={lot.id}>

            <View style={styles.row}>
              <Text style={styles.cardTitle}>{lot.id}</Text>
              <Text style={styles.status}>{lot.status}</Text>
            </View>

            <Text style={styles.cardText}>
              Material: {lot.material}
            </Text>

            <Text style={styles.cardText}>
              Weight: {lot.weight}
            </Text>

            <Text style={styles.cardText}>
              Collector: {lot.collector}
            </Text>

            <Text style={styles.cardText}>
              Location: {lot.location}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation?.navigate("LotDetails", {
                  lot: lot,
                })
              }
            >
              <Text style={styles.buttonText}>
                View Details
              </Text>
            </TouchableOpacity>

          </View>
        ))}

      </View>
    </ScrollView>
  );
};

export default IncomingLots;