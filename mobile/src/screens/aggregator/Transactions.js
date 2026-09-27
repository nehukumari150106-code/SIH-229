import React from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";

import styles from "./AggregatorStyles";

const transactions = [
  {
    id: "TXN-2001",
    lot: "LOT-1020",
    recycler: "EcoRecycle Pvt. Ltd.",
    material: "PCB",
    weight: "20 kg",
    rate: "₹410/kg",
    total: "₹8,200",
  },
  {
    id: "TXN-2002",
    lot: "LOT-1019",
    recycler: "Green Earth Recyclers",
    material: "Cable",
    weight: "30 kg",
    rate: "₹300/kg",
    total: "₹9,000",
  },
  {
    id: "TXN-2003",
    lot: "LOT-1018",
    recycler: "Maharashtra E-Waste",
    material: "Battery",
    weight: "22 kg",
    rate: "₹190/kg",
    total: "₹4,180",
  },
];

const Transactions = () => {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Transactions
        </Text>

        <Text style={styles.headerSubtitle}>
          Financial transaction records
        </Text>
      </View>

      <View style={styles.content}>

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>
              Total Value
            </Text>

            <Text style={styles.statValue}>
              ₹21,380
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>
              Completed
            </Text>

            <Text style={styles.statValue}>
              3
            </Text>
          </View>

        </View>

        {transactions.map((item) => (

          <View style={styles.card} key={item.id}>

            <View style={styles.row}>
              <Text style={styles.cardTitle}>
                {item.id}
              </Text>

              <Text style={styles.status}>
                Completed
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

            <Text style={styles.cardText}>
              Rate: {item.rate}
            </Text>

            <Text style={styles.price}>
              Total: {item.total}
            </Text>

          </View>

        ))}

      </View>
    </ScrollView>
  );
};

export default Transactions;