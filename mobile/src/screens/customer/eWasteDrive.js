import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

const EWasteDrive = ({ navigation }) => {
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    setRegistered(true);

    Alert.alert(
      "Registration Successful",
      "You have successfully registered for the E-Waste Drive."
    );
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>E-Waste Drive</Text>
      </View>

      {/* Introduction */}
      <View style={styles.introCard}>
        <Text style={styles.introIcon}>♻️</Text>

        <Text style={styles.introTitle}>
          Dispose E-Waste Responsibly
        </Text>

        <Text style={styles.introText}>
          Join a nearby e-waste collection drive and safely hand over
          your unwanted electronic items.
        </Text>
      </View>

      {/* Upcoming Drive */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          📍 Upcoming E-Waste Drive
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📅 Date</Text>
          <Text style={styles.value}>5 October 2026</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>⏰ Time</Text>
          <Text style={styles.value}>10:00 AM – 4:00 PM</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📍 Location</Text>
          <Text style={styles.value}>
            Community Collection Centre
          </Text>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={[
            styles.registerButton,
            registered && styles.registeredButton,
          ]}
          onPress={handleRegister}
          disabled={registered}
        >
          <Text style={styles.registerButtonText}>
            {registered ? "✓ Registered" : "Register for Drive"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* What to Bring */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          📦 What You Can Bring
        </Text>

        <Text style={styles.listItem}>• Mobile phones</Text>
        <Text style={styles.listItem}>• Laptops and computers</Text>
        <Text style={styles.listItem}>• Chargers and cables</Text>
        <Text style={styles.listItem}>• Batteries</Text>
        <Text style={styles.listItem}>• Keyboards and mice</Text>
        <Text style={styles.listItem}>• Small electronic devices</Text>
      </View>

      {/* Safety Instructions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          ⚠️ Safety Instructions
        </Text>

        <Text style={styles.listItem}>
          • Do not open or break electronic devices.
        </Text>

        <Text style={styles.listItem}>
          • Keep batteries separate from other e-waste.
        </Text>

        <Text style={styles.listItem}>
          • Do not puncture, crush or burn batteries.
        </Text>

        <Text style={styles.listItem}>
          • Handle CRTs and damaged electronics carefully.
        </Text>

        <Text style={styles.listItem}>
          • Do not bring leaking batteries without informing the collector.
        </Text>
      </View>

      {/* Drive History */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          📋 My Drive Status
        </Text>

        {registered ? (
          <Text style={styles.statusText}>
            ✓ You are registered for the upcoming drive.
          </Text>
        ) : (
          <Text style={styles.noStatusText}>
            You have not registered for any upcoming drive.
          </Text>
        )}
      </View>

    </ScrollView>
  );
};

export default EWasteDrive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F5",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },

  backButton: {
    marginRight: 15,
  },

  backText: {
    fontSize: 30,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  introCard: {
    margin: 16,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
  },

  introIcon: {
    fontSize: 40,
    marginBottom: 8,
  },

  introTitle: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  introText: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 15,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 15,
  },

  infoRow: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
  },

  value: {
    fontSize: 16,
  },

  registerButton: {
    marginTop: 10,
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  registeredButton: {
    backgroundColor: "#757575",
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  listItem: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 8,
  },

  statusText: {
    fontSize: 15,
    color: "#2E7D32",
    fontWeight: "600",
  },

  noStatusText: {
    fontSize: 15,
    color: "#666666",
  },
});