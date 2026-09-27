import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import styles from "./AggregatorStyles";

const AggregatorDashboard = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aggregator Dashboard</Text>
        <Text style={styles.headerSubtitle}>
          Manage lots, inventory and recycler activity
        </Text>
      </View>

      <View style={styles.content}>

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Total Lots</Text>
            <Text style={styles.statValue}>24</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Pending Lots</Text>
            <Text style={styles.statValue}>5</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Inventory</Text>
            <Text style={styles.statValue}>180 kg</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>This Month</Text>
            <Text style={styles.statValue}>₹42.6K</Text>
          </View>

        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Incoming Lots</Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.material}>PCB - LOT-1024</Text>
              <Text style={styles.status}>Received</Text>
            </View>
            <Text style={styles.cardText}>Amit Shinde • Rajur</Text>
            <Text style={styles.cardText}>25 kg</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.material}>Cable - LOT-1025</Text>
              <Text style={styles.status}>Received</Text>
            </View>
            <Text style={styles.cardText}>Suresh Pawar • Parner</Text>
            <Text style={styles.cardText}>40 kg</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation?.navigate("IncomingLots")}
          >
            <Text style={styles.buttonText}>View Incoming Lots</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Inventory Summary</Text>

          <Text style={styles.material}>PCB - 75 kg</Text>
          <Text style={styles.material}>Cable - 40 kg</Text>
          <Text style={styles.material}>Motor - 30 kg</Text>
          <Text style={styles.material}>Mixed Plastic - 35 kg</Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation?.navigate("Inventory")}
          >
            <Text style={styles.secondaryButtonText}>
              View Inventory
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Recycler Offers</Text>

          <Text style={styles.material}>EcoRecycle Pvt. Ltd.</Text>
          <Text style={styles.cardText}>
            PCB • 25 kg
          </Text>
          <Text style={styles.price}>₹420/kg</Text>

          <View style={{ height: 15 }} />

          <Text style={styles.material}>Green Earth Recyclers</Text>
          <Text style={styles.cardText}>
            Cable • 40 kg
          </Text>
          <Text style={styles.price}>₹310/kg</Text>
        </View>

      </View>
    </ScrollView>
  );
};

export default AggregatorDashboard;