// AppStack.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import PrivateStack from './PrivateStack';
import ALLStadiums from '../screens/AllStadiums';
import MyReservation from '../screens/MyReservation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Historique from '../screens/Historique';
import MyProfile from '../screens/MyProfile';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false ,
      drawerActiveBackgroundColor: '#228B22',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
      },
    }}>
      <Drawer.Screen
        name="Nome"
        component={PrivateStack} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="All Stadiums"
        component={ALLStadiums}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="football" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="My Reservations"
        component={MyReservation}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="pricetag" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="My Profil"
        component={MyProfile}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="person" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
