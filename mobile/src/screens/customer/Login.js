import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Login({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>♻️</Text>

      <Text style={styles.title}>Kabadiwala Connect</Text>

      <Text style={styles.subtitle}>
        Give your scrap a new journey.
      </Text>

      <View style={styles.card}>

        <Text style={styles.heading}>Customer Login</Text>

        <Text style={styles.label}>Mobile Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password / OTP</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password or OTP"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CustomerDashboard')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>
          New here? You can register later.
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20,
    justifyContent: 'center',
  },

  logo: {
    fontSize: 55,
    textAlign: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#176B4D',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#5F6B65',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    elevation: 3,
  },

  heading: {
    fontSize: 21,
    fontWeight: '700',
    color: '#17201C',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#17201C',
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D8E1DC',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
  },

  button: {
    height: 52,
    backgroundColor: '#176B4D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  helpText: {
    fontSize: 12,
    color: '#5F6B65',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Login;