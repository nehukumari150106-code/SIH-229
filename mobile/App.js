import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecyclerDashboard from './src/screens/recycler/RecyclerDashboard';
import AvailableLots from './src/screens/recycler/AvailableLots';
import LotDetails from './src/screens/recycler/LotDetails';
import MakeOffer from './src/screens/recycler/MakeOffer';
import RecyclerProfile from './src/screens/recycler/RecyclerProfile';
import MyOffers from './src/screens/recycler/MyOffers';
import Handover from './src/screens/recycler/Handover';
import Transactions from './src/screens/recycler/Transactions';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RecyclerDashboard">
        <Stack.Screen name="RecyclerDashboard" component={RecyclerDashboard} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="AvailableLots" component={AvailableLots} options={{ title: 'Available Lots' }} />
        <Stack.Screen name="LotDetails" component={LotDetails} options={{ title: 'Lot Details' }} />
        <Stack.Screen name="MakeOffer" component={MakeOffer} options={{ title: 'Make an Offer' }} />
        <Stack.Screen name="RecyclerProfile" component={RecyclerProfile} options={{ title: 'My Profile' }} />
        <Stack.Screen name="MyOffers" component={MyOffers} options={{ title: 'My Offers' }} />
        <Stack.Screen name="Handover" component={Handover} options={{ title: 'Handover' }} />
        <Stack.Screen name="Transactions" component={Transactions} options={{ title: 'Transactions' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}