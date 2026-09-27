import React from 'react';

import {
  NavigationContainer
} from '@react-navigation/native';

import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';

import CollectorLogin from '../screens/collector/CollectorLogin';
import CollectorDashboard from '../screens/collector/CollectorDashboard';
import IncomingRequests from '../screens/collector/IncomingRequests';
import PickupDetails from '../screens/collector/PickupDetails';
import ActivePickup from '../screens/collector/ActivePickup';
import RecordWeight from '../screens/collector/RecordWeight';
import PaymentConfirmation from '../screens/collector/PaymentConfirmation';
import MyPickups from '../screens/collector/MyPickups';
import Earnings from '../screens/collector/Earnings';
import Transactions from '../screens/collector/Transactions';
import TransactionDetails from '../screens/collector/TransactionDetails';
import Notifications from '../screens/collector/Notifications';
import CollectorProfile from '../screens/collector/CollectorProfile';

const Stack = createNativeStackNavigator();

export default function CollectorNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="CollectorLogin"
          component={CollectorLogin}
        />

        <Stack.Screen
          name="CollectorDashboard"
          component={CollectorDashboard}
        />

        <Stack.Screen
          name="IncomingRequests"
          component={IncomingRequests}
        />

        <Stack.Screen
          name="PickupDetails"
          component={PickupDetails}
        />

        <Stack.Screen
          name="ActivePickup"
          component={ActivePickup}
        />

        <Stack.Screen
          name="RecordWeight"
          component={RecordWeight}
        />

        <Stack.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmation}
        />

        <Stack.Screen
          name="MyPickups"
          component={MyPickups}
        />

        <Stack.Screen
          name="Earnings"
          component={Earnings}
        />

        <Stack.Screen
          name="Transactions"
          component={Transactions}
        />

        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
        />

        <Stack.Screen
          name="Notifications"
          component={Notifications}
        />

        <Stack.Screen
          name="CollectorProfile"
          component={CollectorProfile}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}