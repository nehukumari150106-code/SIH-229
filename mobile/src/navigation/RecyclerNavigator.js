import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import RecyclerDashboard from '../screens/recycler/RecyclerDashboard';
import AvailableLots from '../screens/recycler/AvailableLots';
import LotDetails from '../screens/recycler/LotDetails';
import MakeOffer from '../screens/recycler/MakeOffer';
import MyOffers from '../screens/recycler/MyOffers';
import Handover from '../screens/recycler/Handover';
import Transactions from '../screens/recycler/Transactions';
import RecyclerProfile from '../screens/recycler/RecyclerProfile';

const Stack = createNativeStackNavigator();

export default function RecyclerNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RecyclerDashboard"
          component={RecyclerDashboard}
          options={{title: 'Dashboard'}}
        />

        <Stack.Screen
          name="AvailableLots"
          component={AvailableLots}
          options={{title: 'Available Lots'}}
        />

        <Stack.Screen
          name="LotDetails"
          component={LotDetails}
          options={{title: 'Lot Details'}}
        />

        <Stack.Screen
          name="MakeOffer"
          component={MakeOffer}
          options={{title: 'Make Offer'}}
        />

        <Stack.Screen
          name="MyOffers"
          component={MyOffers}
          options={{title: 'My Offers'}}
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
          name="RecyclerProfile"
          component={RecyclerProfile}
          options={{title: 'My Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}