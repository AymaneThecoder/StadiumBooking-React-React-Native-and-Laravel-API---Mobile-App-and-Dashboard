import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Nome from '../screens/Nome';
import DetailsScreen from '../screens/DetailsScreen';
import Login from '../screens/Login';
import Nome from '../screens/Nome';
import MyReservation from '../screens/MyReservation';
import AllStadiums from '../screens/AllStadiums';
import MyProfile from '../screens/MyProfile';
import Signup from '../screens/Signup';

const Stack = createNativeStackNavigator();

const PrivateStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Nome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MyReservation" component={MyReservation} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="AllStadiums" component={AllStadiums} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default PrivateStack;
