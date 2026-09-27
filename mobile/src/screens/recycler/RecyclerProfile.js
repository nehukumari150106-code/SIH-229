import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecyclerProfile() {
  // This matches the exact data fields P4 must provide to P5 for the database
  const profileData = {
    recycler_id: "REC-001",
    name: "EcoRecycle Corp",
    location: "Pune",
    authorization_status: "Verified",
    accepted_materials: ["PCB", "Cable", "Battery", "Motor"],
    service_area: "20km",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Recycler Profile</Text>
      
      <View style={styles.card}>
        <Text style={styles.nameText}>{profileData.name}</Text>
        <Text style={styles.detailText}>ID: {profileData.recycler_id}</Text>
        <Text style={styles.detailText}>Location: {profileData.location}</Text>
        <Text style={styles.detailText}>Service Area: {profileData.service_area}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Authorization</Text>
        <Text style={styles.successText}>✓ {profileData.authorization_status}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Accepted Materials</Text>
        {profileData.accepted_materials.map((material, index) => (
          <Text key={index} style={styles.detailText}>• {material}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#17201C',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderColor: '#DDE5E0',
    borderWidth: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#17201C',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#5F6B65',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17201C',
    marginTop: 8,
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32', // Shared Success Color
  },
  divider: {
    height: 1,
    backgroundColor: '#DDE5E0',
    marginVertical: 16,
  }
});