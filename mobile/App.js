import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecyclerDashboard from './src/screens/recycler/RecyclerDashboard';
import AvailableLots from './src/screens/recycler/AvailableLots';
import MakeOffer from './src/screens/recycler/MakeOffer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RecyclerDashboard">
        <Stack.Screen 
          name="RecyclerDashboard" 
          component={RecyclerDashboard} 
          options={{ title: 'Dashboard' }} 
        />
        <Stack.Screen 
          name="AvailableLots" 
          component={AvailableLots} 
          options={{ title: 'Available Lots' }} 
        />
        <Stack.Screen 
          name="MakeOffer" 
          component={MakeOffer} 
          options={{ title: 'Make an Offer' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}