import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

export default function CollectorLogin({ navigation }) {

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {

    if (!phone || !password) {
      Alert.alert(
        'Missing Details',
        'Please enter phone number and password.'
      );
      return;
    }

    navigation.replace('CollectorDashboard');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Collector Login
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    justifyContent: 'center',
    padding: 25
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#176B4D',
    marginBottom: 25,
    textAlign: 'center'
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5E0',
    padding: 14,
    borderRadius: 8,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#176B4D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});