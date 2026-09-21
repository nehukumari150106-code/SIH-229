import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import styles from "./AggregatorStyles";

const handovers = [
  {
    id: "HND-501",
    lot: "LOT-1020",
    recycler: "EcoRecycle Pvt. Ltd.",
    material: "PCB",
    weight: "20 kg",
    status: "Completed",
  },
  {
    id: "HND-502",
    lot: "LOT-1021",
    recycler: "Green Earth Recyclers",
    material: "Cable",
    weight: "30 kg",
    status: "Ready",
  },
];

const Handover = () => {

  const createHandover = () => {
    alert("Handover form opened");
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Handover
        </Text>

        <Text style={styles.headerSubtitle}>
          Transfer material to verified recyclers
        </Text>
      </View>

      <View style={styles.content}>

        {handovers.map((item) => (

          <View style={styles.card} key={item.id}>

            <View style={styles.row}>
              <Text style={styles.cardTitle}>
                {item.id}
              </Text>

              <Text style={styles.status}>
                {item.status}
              </Text>
            </View>

            <Text style={styles.cardText}>
              Lot: {item.lot}
            </Text>

            <Text style={styles.cardText}>
              Recycler: {item.recycler}
            </Text>

            <Text style={styles.cardText}>
              Material: {item.material}
            </Text>

            <Text style={styles.cardText}>
              Weight: {item.weight}
            </Text>

          </View>

        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={createHandover}
        >
          <Text style={styles.buttonText}>
            + Create Handover
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default Handover;