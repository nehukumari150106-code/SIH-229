import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googleLogin} from '../../services/api';

function Login({navigation, onAuthenticated}) {
  const [loading, setLoading] = useState(false);
  const [pendingIdToken, setPendingIdToken] = useState(null);
const [showRoleSelection, setShowRoleSelection] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '681570710606-pff01be1mp7p0rclrkluoedu5hodiomj.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices();

      const response = await GoogleSignin.signIn();

console.log('Google Sign-In response:', response);

if (response.type !== 'success') {
  throw new Error('Google sign-in was not successful.');
}

const idToken = response.data?.idToken;

if (!idToken) {
  throw new Error('Google ID token was not returned.');
}

console.log('Google ID token received.');

setPendingIdToken(idToken);
setShowRoleSelection(true);

console.log('ROLE SELECTION SHOULD SHOW NOW');
    } catch (error) {
      console.log('Google Sign-In error:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled Google Sign-In');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign-In already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          'Google Play Services',
          'Google Play Services is not available on this device.',
        );
      } else {
        Alert.alert(
          'Google Sign-In Failed',
          'Something went wrong while signing in with Google.',
        );
      }
    } finally {
      setLoading(false);
    }
  };
  const handleRoleSelection = async role => {
  try {
    setLoading(true);

    const user = await googleLogin(pendingIdToken, role);

    console.log('Backend user:', user);

    setShowRoleSelection(false);
setPendingIdToken(null);

onAuthenticated(user);

navigation.replace('CustomerDashboard');
  } catch (error) {
    console.log('Role authentication error:', error);

    Alert.alert(
      'Authentication Failed',
      error.message || 'Could not complete authentication.',
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <View style={styles.card}>
  {showRoleSelection ? (
    <>
      <Text style={styles.heading}>Choose Your Role</Text>

      <Text style={styles.roleSubtitle}>
        Select how you will use Kabadiwala Connect.
      </Text>

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelection('customer')}
        disabled={loading}>
        <Text style={styles.roleIcon}>👤</Text>
        <Text style={styles.roleButtonText}>Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelection('collector')}
        disabled={loading}>
        <Text style={styles.roleIcon}>🚚</Text>
        <Text style={styles.roleButtonText}>Collector</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelection('aggregator')}
        disabled={loading}>
        <Text style={styles.roleIcon}>🏭</Text>
        <Text style={styles.roleButtonText}>Aggregator</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelection('recycler')}
        disabled={loading}>
        <Text style={styles.roleIcon}>♻️</Text>
        <Text style={styles.roleButtonText}>Recycler</Text>
      </TouchableOpacity>

      {loading && (
        <Text style={styles.helpText}>
          Setting up your account...
        </Text>
      )}
    </>
  ) : (
    <>
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
        onPress={() => navigation.navigate('CustomerDashboard')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        disabled={loading}>
        <Text style={styles.googleIcon}>G</Text>

        <Text style={styles.googleButtonText}>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.helpText}>
        Sign in with your Google account to continue.
      </Text>
    </>
  )}
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

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D8E1DC',
  },

  orText: {
    marginHorizontal: 12,
    color: '#5F6B65',
    fontSize: 12,
    fontWeight: '600',
  },

  googleButton: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D8E1DC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 10,
  },

  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#17201C',
  },

  helpText: {
    fontSize: 12,
    color: '#5F6B65',
    textAlign: 'center',
    marginTop: 16,
  },
  roleSubtitle: {
  fontSize: 14,
  color: '#5F6B65',
  marginBottom: 18,
},

roleButton: {
  height: 58,
  borderWidth: 1,
  borderColor: '#D8E1DC',
  borderRadius: 12,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  marginBottom: 12,
  backgroundColor: '#FFFFFF',
},

roleIcon: {
  fontSize: 24,
  marginRight: 14,
},

roleButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#17201C',
},
});

export default Login;