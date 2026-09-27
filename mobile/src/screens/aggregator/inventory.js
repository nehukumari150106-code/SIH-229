import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import styles from "./AggregatorStyles";

const inventory = [
  {
    material: "PCB",
    weight: 75,
    percentage: "90%",
  },
  {
    material: "Cable",
    weight: 40,
    percentage: "55%",
  },
  {
    material: "Motor",
    weight: 30,
    percentage: "40%",
  },
  {
    material: "Mixed Plastic",
    weight: 35,
    percentage: "45%",
  },
];

const Inventory = () => {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inventory</Text>
        <Text style={styles.headerSubtitle}>
          Current material stock
        </Text>
      </View>

      <View style={styles.content}>

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>
              Total Inventory
            </Text>
            <Text style={styles.statValue}>
              180 kg
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>
              Categories
            </Text>
            <Text style={styles.statValue}>
              4
            </Text>
          </View>

        </View>

        {inventory.map((item) => (
          <View style={styles.card} key={item.material}>

            <View style={styles.inventoryRow}>

              <View style={{ flex: 1 }}>
                <Text style={styles.material}>
                  {item.material}
                </Text>

                <View style={styles.row}>

                  <View style={styles.progressBackground}>
                    <View
                      style={[
                        styles.progress,
                        {
                          width: item.percentage,
                        },
                      ]}
                    />
                  </View>

                  <Text style={styles.inventoryWeight}>
                    {item.weight} kg
                  </Text>

                </View>
              </View>

            </View>

          </View>
        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Add Inventory form opened")}
        >
          <Text style={styles.buttonText}>
            + Add Inventory
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
};

export default Inventory;