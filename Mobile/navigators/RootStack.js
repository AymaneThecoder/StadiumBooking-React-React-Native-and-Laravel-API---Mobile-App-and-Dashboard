import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Nome from '../screens/Nome';
import DetailsScreen from '../screens/DetailsScreen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Nome from '../screens/Nome';


const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Nome" component={Nome} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />

    </Stack.Navigator>
  );
};

export default RootStack;
