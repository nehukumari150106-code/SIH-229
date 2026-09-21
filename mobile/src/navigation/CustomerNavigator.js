import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/customer/Login';
import CustomerDashboard from '../screens/customer/CustomerDashboard';
import CreatePickup from '../screens/customer/CreatePickup';
import PickupDetails from '../screens/customer/PickupDetails';
import MyPickups from '../screens/customer/MyPickups';
import PickupTracking from '../screens/customer/PickupTracking';
import Transactions from '../screens/customer/Transactions';
import TransactionDetails from '../screens/customer/TransactionDetails';
import CustomerProfile from '../screens/customer/CustomerProfile';

const Stack = createNativeStackNavigator();

function CustomerNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CustomerDashboard"
          component={CustomerDashboard}
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen
  name="CreatePickup"
  component={CreatePickup}
  options={{ title: 'Create Pickup' }}
/>
<Stack.Screen
  name="PickupDetails"
  component={PickupDetails}
  options={{ title: 'Pickup Details' }}
/>
<Stack.Screen
  name="MyPickups"
  component={MyPickups}
  options={{ title: 'My Pickups' }}
/>
<Stack.Screen
  name="PickupTracking"
  component={PickupTracking}
  options={{ title: 'Pickup Tracking' }}
/>
<Stack.Screen
  name="Transactions"
  component={Transactions}
  options={{ title: 'Transactions' }}
/>
<Stack.Screen
  name="TransactionDetails"
  component={TransactionDetails}
  options={{ title: 'Transaction Details' }}
/>
<Stack.Screen
  name="CustomerProfile"
  component={CustomerProfile}
  options={{ title: 'My Profile' }}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default CustomerNavigator;