import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import AggregatorDashboard from '../screens/aggregator/Aggregator Dashboard';
import AggregatorProfile from '../screens/aggregator/AggregatorProfile';
import IncomingLots from '../screens/aggregator/Incominglots';
import LotDetails from '../screens/aggregator/LotDetails';
import Inventory from '../screens/aggregator/inventory';
import RecyclerOffers from '../screens/aggregator/Recycleroffers';
import Handover from '../screens/aggregator/Handover';
import Transactions from '../screens/aggregator/Transactions';

const Stack = createNativeStackNavigator();

export default function AggregatorNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AggregatorDashboard"
          component={AggregatorDashboard}
          options={{title: 'Dashboard'}}
        />

        <Stack.Screen
          name="IncomingLots"
          component={IncomingLots}
          options={{title: 'Incoming Lots'}}
        />

        <Stack.Screen
          name="LotDetails"
          component={LotDetails}
          options={{title: 'Lot Details'}}
        />

        <Stack.Screen
          name="Inventory"
          component={Inventory}
          options={{title: 'Inventory'}}
        />

        <Stack.Screen
          name="RecyclerOffers"
          component={RecyclerOffers}
          options={{title: 'Recycler Offers'}}
        />

        <Stack.Screen
          name="Handover"
          component={Handover}
          options={{title: 'Handover'}}
        />

        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{title: 'Transactions'}}
        />

        <Stack.Screen
          name="AggregatorProfile"
          component={AggregatorProfile}
          options={{title: 'My Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}