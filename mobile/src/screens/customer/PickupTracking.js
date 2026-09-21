import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function PickupTracking({ navigation, route }) {

  const pickup = route?.params?.pickup || {
    pickup_id: 'PICKUP-1789928214322',
    material: 'LCD',
    estimated_weight: 5,
    location: 'Pune',
    preferred_time: '5 PM',
    status: 'pending',
  };

  const steps = [
    {
      title: 'Pickup Created',
      description: 'Your pickup request has been created.',
      completed: true,
    },
    {
      title: 'Request Pending',
      description: 'Waiting for a collector to accept your request.',
      completed: pickup.status !== 'pending',
    },
    {
      title: 'Collector Accepted',
      description: 'A collector has accepted your pickup.',
      completed: false,
    },
    {
      title: 'Collector On The Way',
      description: 'The collector is travelling to your location.',
      completed: false,
    },
    {
      title: 'Scrap Collected',
      description: 'Your scrap has been collected successfully.',
      completed: false,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.title}>Pickup Tracking</Text>

      <Text style={styles.subtitle}>
        Track the progress of your scrap pickup.
      </Text>

      {/* Pickup Summary */}
      <View style={styles.summaryCard}>

        <View>
          <Text style={styles.material}>
            {pickup.material}
          </Text>

          <Text style={styles.pickupId}>
            {pickup.pickup_id}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {pickup.status.toUpperCase()}
          </Text>
        </View>

      </View>

      {/* Tracking Timeline */}
      <View style={styles.trackingCard}>

        <Text style={styles.cardTitle}>
          Pickup Progress
        </Text>

        {steps.map((step, index) => (
          <View
            key={step.title}
            style={styles.stepContainer}
          >

            <View style={styles.timeline}>

              <View
                style={[
                  styles.circle,
                  step.completed && styles.circleCompleted,
                ]}
              >
                {step.completed && (
                  <Text style={styles.check}>
                    ✓
                  </Text>
                )}
              </View>

              {index !== steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    step.completed && styles.lineCompleted,
                  ]}
                />
              )}

            </View>

            <View style={styles.stepContent}>

              <Text
                style={[
                  styles.stepTitle,
                  step.completed && styles.stepTitleCompleted,
                ]}
              >
                {step.title}
              </Text>

              <Text style={styles.stepDescription}>
                {step.description}
              </Text>

            </View>

          </View>
        ))}

      </View>

      {/* Pickup Information */}
      <View style={styles.infoCard}>

        <Text style={styles.cardTitle}>
          Pickup Information
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Estimated Weight</Text>
          <Text style={styles.value}>
            {pickup.estimated_weight} kg
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>
            {pickup.location}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Preferred Time</Text>
          <Text style={styles.value}>
            {pickup.preferred_time}
          </Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyPickups')}
      >
        <Text style={styles.buttonText}>
          Back to My Pickups
        </Text>
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
    fontSize: 28,
    fontWeight: '700',
    color: '#176B4D',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#5F6B65',
    marginTop: 6,
    marginBottom: 20,
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 18,
  },

  material: {
    fontSize: 20,
    fontWeight: '700',
    color: '#17201C',
  },

  pickupId: {
    fontSize: 11,
    color: '#5F6B65',
    marginTop: 5,
  },

  statusBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C77700',
  },

  trackingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    elevation: 2,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#17201C',
    marginBottom: 20,
  },

  stepContainer: {
    flexDirection: 'row',
    minHeight: 82,
  },

  timeline: {
    width: 35,
    alignItems: 'center',
  },

  circle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#E0E5E2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleCompleted: {
    backgroundColor: '#176B4D',
  },

  check: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E5E2',
    marginVertical: 3,
  },

  lineCompleted: {
    backgroundColor: '#176B4D',
  },

  stepContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 18,
  },

  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5F6B65',
  },

  stepTitleCompleted: {
    color: '#176B4D',
  },

  stepDescription: {
    fontSize: 12,
    color: '#7A847F',
    marginTop: 4,
    lineHeight: 17,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    elevation: 2,
    marginBottom: 18,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAE7',
    paddingVertical: 13,
  },

  label: {
    fontSize: 13,
    color: '#5F6B65',
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#17201C',
  },

  button: {
    height: 52,
    backgroundColor: '#176B4D',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PickupTracking;