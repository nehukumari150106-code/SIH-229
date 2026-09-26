import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CUSTOMER_CATEGORIES } from '../../constants/customerCategories';
import { scanAndMatchEwaste } from '../../api/client';

function CreatePickup({ navigation }) {
  const [customerCategory, setCustomerCategory] = useState(null);
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectPhoto = () => {
    Alert.alert(
      'Upload Photo',
      'Choose an option to upload e-waste photo',
      [
        {
          text: 'Take Photo',
          onPress: () => {
            launchCamera({ mediaType: 'photo', quality: 0.8 }, (response) => {
              if (response.assets && response.assets.length > 0) {
                setPhotoUri(response.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
              if (response.assets && response.assets.length > 0) {
                setPhotoUri(response.assets[0].uri);
              }
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleCreatePickup = async () => {
    if (!weight || !location || !preferredTime) {
      Alert.alert('Missing Information', 'Please fill in weight, location, and preferred time.');
      return;
    }

    setLoading(true);

    try {
      let apiResult = null;
      if (photoUri) {
        apiResult = await scanAndMatchEwaste({
          imageUri: photoUri,
          location,
          weight,
          preferredTime,
        });
      }

      // Map response or fallback to local category selection
      const matchedCategory = apiResult?.category || customerCategory || 'OTHER_ELECTRONICS';

      const pickup = {
        pickup_id: apiResult?.pickup_id || `PICKUP-${Date.now()}`,
        customer_id: 'customer_demo',
        collector_id: apiResult?.matched_collector?.id || null,
        customer_category: matchedCategory,
        category_confidence: apiResult?.confidence || null,
        photo_url: photoUri,
        estimated_weight: parseFloat(weight),
        location: location,
        preferred_time: preferredTime,
        status: 'pending',
        matched_collector: apiResult?.matched_collector || null,
      };

      setLoading(false);
      navigation.navigate('PickupDetails', { pickup });
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Backend Connection Failed',
        'Could not complete AI classification/matching. Proceeding with local input.',
        [
          {
            text: 'OK',
            onPress: () => {
              const fallbackPickup = {
                pickup_id: `PICKUP-${Date.now()}`,
                customer_id: 'customer_demo',
                collector_id: null,
                customer_category: customerCategory || 'OTHER_ELECTRONICS',
                category_confidence: null,
                photo_url: photoUri,
                estimated_weight: parseFloat(weight),
                location: location,
                preferred_time: preferredTime,
                status: 'pending',
              };
              navigation.navigate('PickupDetails', { pickup: fallbackPickup });
            },
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create Pickup</Text>
      <Text style={styles.subtitle}>Tell us about the scrap you want to sell.</Text>

      {/* Scrap Category */}
      <Text style={styles.label}>What do you have? (Optional if uploading photo)</Text>
      <View style={styles.categoryContainer}>
        {CUSTOMER_CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.categoryButton,
              customerCategory === item.id && styles.categorySelected,
            ]}
            onPress={() => setCustomerCategory(item.id)}
          >
            <Text style={styles.categoryEmoji}>{item.emoji}</Text>
            <Text
              style={[
                styles.categoryText,
                customerCategory === item.id && styles.categoryTextSelected,
              ]}
            >
              {item.label}{'\n'}{item.marathiLabel}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Photo */}
      <Text style={styles.label}>Photo (Enables AI Recognition)</Text>
      <TouchableOpacity style={styles.photoButton} onPress={handleSelectPhoto}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoIcon}>📷</Text>
            <Text style={styles.photoText}>Add Scrap Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Weight */}
      <Text style={styles.label}>Approx. Quantity / Weight (kg)</Text>
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

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.createButton, loading && styles.disabledButton]}
        onPress={handleCreatePickup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.createButtonText}>Create Pickup</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '700', color: '#176B4D', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#5F6B65', marginTop: 6, marginBottom: 25 },
  label: { fontSize: 15, fontWeight: '600', color: '#17201C', marginBottom: 9, marginTop: 8 },
  categoryContainer: { flexDirection: 'column', gap: 12, marginBottom: 15 },
  categoryButton: {
    minHeight: 88,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E1DC',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categorySelected: { backgroundColor: '#176B4D', borderColor: '#176B4D' },
  categoryText: { color: '#17201C', fontSize: 16, fontWeight: '600', lineHeight: 24, marginLeft: 14 },
  categoryTextSelected: { color: '#FFFFFF', fontWeight: '600' },
  categoryEmoji: { fontSize: 34, width: 44, textAlign: 'center' },
  photoButton: {
    height: 120,
    backgroundColor: '#E8F5EF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B9D9CB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  photoPlaceholder: { alignItems: 'center' },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  photoIcon: { fontSize: 22 },
  photoText: { color: '#176B4D', fontSize: 13, fontWeight: '600', marginTop: 3 },
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
    justify.content: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  disabledButton: { opacity: 0.7 },
  createButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
});

export default CreatePickup;
