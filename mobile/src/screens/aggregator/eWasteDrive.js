import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

const EWasteDrive = ({ navigation }) => {

  const [driveCreated, setDriveCreated] = useState(false);

  const createDrive = () => {
    setDriveCreated(true);

    Alert.alert(
      "Drive Created",
      "The E-Waste Drive has been created successfully."
    );
  };

  return (
    <ScrollView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>
            E-Waste Drive
          </Text>

          <Text style={styles.subtitle}>
            Create and manage collection drives
          </Text>
        </View>

      </View>


      {/* Upcoming Drive */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          ♻️ Upcoming E-Waste Drive
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>5 October 2026</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>
            10:00 AM – 4:00 PM
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>
            Community Collection Centre
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Expected Collection
          </Text>

          <Text style={styles.value}>
            100 kg
          </Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>
            Upcoming
          </Text>
        </View>

      </View>


      {/* Create Drive */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Create New Drive
        </Text>

        <Text style={styles.cardText}>
          Create a community collection drive and
          coordinate e-waste collection.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={createDrive}
        >
          <Text style={styles.buttonText}>
            Create E-Waste Drive
          </Text>
        </TouchableOpacity>

      </View>


      {/* Drive Management */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          📊 Drive Management
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>
            Registered Collectors
          </Text>

          <Text style={styles.value}>
            6
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Collected E-Waste
          </Text>

          <Text style={styles.value}>
            72 kg
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Remaining Target
          </Text>

          <Text style={styles.value}>
            28 kg
          </Text>
        </View>

      </View>


      {/* What Can Be Collected */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          📦 Accepted E-Waste
        </Text>

        <Text style={styles.item}>
          • Mobile phones
        </Text>

        <Text style={styles.item}>
          • Laptops and computers
        </Text>

        <Text style={styles.item}>
          • Chargers and cables
        </Text>

        <Text style={styles.item}>
          • Batteries
        </Text>

        <Text style={styles.item}>
          • Keyboards and mice
        </Text>

        <Text style={styles.item}>
          • Small electronic devices
        </Text>

      </View>


      {/* Safety Instructions */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          ⚠️ Safety Instructions
        </Text>

        <Text style={styles.item}>
          • Keep batteries separate.
        </Text>

        <Text style={styles.item}>
          • Do not puncture or crush batteries.
        </Text>

        <Text style={styles.item}>
          • Do not open electronic devices.
        </Text>

        <Text style={styles.item}>
          • Handle damaged electronics carefully.
        </Text>

      </View>

    </ScrollView>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F7F9F8",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    fontSize: 30,
    marginRight: 15,
    color: "#176B4D",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#17201C",
  },

  subtitle: {
    fontSize: 14,
    color: "#5F6B65",
    marginTop: 3,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDE5E0",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#17201C",
    marginBottom: 15,
  },

  cardText: {
    fontSize: 14,
    color: "#5F6B65",
    lineHeight: 21,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 10,
  },

  label: {
    fontSize: 14,
    color: "#5F6B65",
    flex: 1,
  },

  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#17201C",
    flex: 1,
    textAlign: "right",
  },

  statusBox: {
    backgroundColor: "#E5F4EC",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },

  statusText: {
    color: "#176B4D",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#176B4D",
    padding: 13,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  item: {
    fontSize: 14,
    color: "#5F6B65",
    marginBottom: 8,
    lineHeight: 20,
  },

});

export default EWasteDrive;