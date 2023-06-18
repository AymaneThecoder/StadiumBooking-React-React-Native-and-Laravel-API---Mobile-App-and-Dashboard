import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as SecureStore from 'expo-secure-store';

const CustomDrawer = (props) => {
  const [itsUsername, setItsUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await SecureStore.getItemAsync('username');
      setItsUsername(username);
    };

    fetchUsername();
  }, []);

  const handleLogout = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      console.log(token);

      const response = await axios.post(
        'http://10.0.2.2:8000/api/logout',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await SecureStore.deleteItemAsync('token');
      if (response.status === 200) {
        Alert.alert('Logged out', 'You have been logged out successfully.', [
          {
            text: 'OK',
            onPress: () => {
              // Redirect to login screen
              props.navigation.navigate('Login');
            },
          },
        ]);
      } else {
        Alert.alert('Logout Failed', 'Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while logging out. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#8200d6' }}>
        <ImageBackground source={require('../assets/menu_image.jpg')} style={{ padding: 20 }}>
          <Image source={require('../assets/user-profile.jpg')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Roboto-Medium', marginBottom: 5 }}>
            {itsUsername}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', marginLeft: 5 }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', marginLeft: 5 }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
