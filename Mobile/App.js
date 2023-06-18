import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from './components/style';
import RootStack from './navigators/RootStack';
import AppStack from './navigators/AppStack';
import Signup from './screens/Signup';
import Login from './screens/Login';
import * as SecureStore from 'expo-secure-store';
import PrivateStack from './navigators/PrivateStack';


const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        setUserToken(token);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error retrieving token:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Loading state
    return null; // You can return a loading indicator here
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          // User is logged in
          // <Stack.Screen name="PrivateStack" component={PrivateStack} />
          <Stack.Screen name="AppStack" component={AppStack} />
          
        ) : (
          // User is not logged in
          <Stack.Screen name="RootStack" component={RootStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
