import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

function CreatePickup({ navigation }) {
  const [category, setCategory] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  const categories = [
    'PCB',
    'Cable',
    'Battery',
    'Motor',
    'CRT',
    'LCD',
    'Mixed Plastic',
    'Other',
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Create Pickup</Text>

      <Text style={styles.subtitle}>
        Tell us about the scrap you want to sell.
      </Text>

      {/* Scrap Category */}
      <Text style={styles.label}>Scrap Category</Text>

      <View style={styles.categoryContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              category === item && styles.categorySelected,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                category === item && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Photo */}
      <Text style={styles.label}>Photo</Text>

      <TouchableOpacity style={styles.photoButton}>
        <Text style={styles.photoIcon}>📷</Text>
        <Text style={styles.photoText}>Add Scrap Photo</Text>
      </TouchableOpacity>

      {/* Weight */}
      <Text style={styles.label}>Approx. Quantity / Weight</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter approximate weight"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      {/* Location */}
      <Text style={styles.label}>Location</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter pickup location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Preferred Time */}
      <Text style={styles.label}>Preferred Pickup Time</Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Tomorrow, 5 PM"
        value={preferredTime}
        onChangeText={setPreferredTime}
      />

      {/* Create Pickup */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
  if (!category || !weight || !location || !preferredTime) {
    Alert.alert(
      'Missing Information',
      'Please fill in all pickup details.'
    );
    return;
  }

  const pickup = {
    pickup_id: `PICKUP-${Date.now()}`,
    customer_id: 'customer_demo',
    collector_id: null,
    material: category,
    estimated_weight: parseFloat(weight),
    location: location,
    preferred_time: preferredTime,
    status: 'pending',
  };

  console.log('Pickup Created:', pickup);
  navigation.navigate('PickupDetails', {
  pickup: pickup,
});

  Alert.alert(
    'Pickup Created! 🎉',
    `Your ${category} pickup request has been created.`,
  );
}}
      >
        <Text style={styles.createButtonText}>Create Pickup</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#176B4D',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#5F6B65',
    marginTop: 6,
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#17201C',
    marginBottom: 9,
    marginTop: 8,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },

  categoryButton: {
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E1DC',
  },

  categorySelected: {
    backgroundColor: '#176B4D',
    borderColor: '#176B4D',
  },

  categoryText: {
    color: '#17201C',
    fontSize: 13,
  },

  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  photoButton: {
    height: 70,
    backgroundColor: '#E8F5EF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B9D9CB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  photoIcon: {
    fontSize: 22,
  },

  photoText: {
    color: '#176B4D',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },

  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E1DC',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    marginBottom: 15,
  },

  createButton: {
    height: 55,
    backgroundColor: '#176B4D',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default CreatePickup;