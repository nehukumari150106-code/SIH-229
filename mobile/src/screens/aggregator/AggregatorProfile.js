import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "./AggregatorStyles";

const AggregatorProfile = () => {

  const [name, setName] = useState("Rahul Patil");
  const [phone, setPhone] = useState("9876543210");
  const [location, setLocation] = useState("Rajur");
  const [email, setEmail] = useState("rahul@example.com");

  const saveProfile = () => {
    alert("Profile saved successfully");
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Aggregator Profile
        </Text>

        <Text style={styles.headerSubtitle}>
          Account information
        </Text>
      </View>

      <View style={styles.content}>

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Profile Information
          </Text>

          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>
            Phone
          </Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>
            Location
          </Text>

          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />

          <Text style={styles.label}>
            Aggregator ID
          </Text>

          <TextInput
            style={styles.input}
            value="AGG-001"
            editable={false}
          />

          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={saveProfile}
          >
            <Text style={styles.buttonText}>
              Save Changes
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </ScrollView>
  );
};

export default AggregatorProfile;