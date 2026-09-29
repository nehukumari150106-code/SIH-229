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

function CustomerNavigator({
  onAuthenticated,
  startAtDashboard = false,
  currentUser,
}) {  return (
    <NavigationContainer>
      <Stack.Navigator
  initialRouteName={startAtDashboard ? 'CustomerDashboard' : 'Login'}>

        <Stack.Screen
  name="Login"
  options={{headerShown: false}}
>
  {props => (
    <Login
      {...props}
      onAuthenticated={onAuthenticated}
    />
  )}
</Stack.Screen>

        <Stack.Screen
  name="CustomerDashboard"
  options={{title: 'Dashboard'}}>
  {props => (
    <CustomerDashboard
      {...props}
      currentUser={currentUser}
    />
  )}
</Stack.Screen>
        <Stack.Screen
  name="CreatePickup"
  options={{title: 'Create Pickup'}}>
  {props => (
    <CreatePickup
      {...props}
      currentUser={currentUser}
    />
  )}
</Stack.Screen>
<Stack.Screen
  name="PickupDetails"
  component={PickupDetails}
  options={{ title: 'Pickup Details' }}
/>
<Stack.Screen
  name="MyPickups"
  options={{title: 'My Pickups'}}>
  {props => (
    <MyPickups
      {...props}
      currentUser={currentUser}
    />
  )}
</Stack.Screen>
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