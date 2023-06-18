import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text, FlatList,
  StyleSheet,Animated,
  View,
  ScrollView, 
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "../components/style";

// import stadiums from '../assets/const/Stadiums';

import * as SecureStore from 'expo-secure-store';
import axios from "axios";
const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;

const Home = ({navigation}) => {
  const categories = ['Football', 'Basketball', 'Handball'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [itsUsername, setItsUsername] = useState('');
  const [stadiums, setStadiums] = useState([]);
  const handleLogout = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const username = await SecureStore.getItemAsync('username');
      console.log(token);
      console.log(username);
      setItsUsername(username);
      const response = await axios.post(
        'https://itsstageproject.000webhostapp.com/api/logout',
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
              navigation.navigate('Login');
              
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
  
  

  const CategoryList = ({navigation}) => {
    return (
      <View style={style.categoryListContainer}>
        
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              
              <Text
                style={{
                  ...style.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? Colors.green
                      : Colors.silver,
                }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 30,
                    backgroundColor: Colors.lightgreen,
                    marginTop: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          
        ))}
      </View>
    );
  };
  const Card = ({stadiums, index}) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
      disabled={activeCardIndex !== index}
      activeOpacity={1}
      onPress={() => navigation.navigate('DetailsScreen', stadiums)}
    >
      
      <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
        <Animated.View style={{ ...style.cardOverLay, opacity }} />
        <View style={style.priceTag}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {stadiums.price} Dh
          </Text>
        </View>
        <Image source={stadiums.image} style={style.cardImage} />
        <View style={style.cardDetails}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{stadiums.name}</Text>
            </View>
            <Icon name="bookmark-border" size={26} color={Colors.lightOrange} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 2.5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="place" size={15} color={Colors.lightOrange} style={{ marginRight: 5 }} />
              <Text style={{ color: Colors.darkLight, fontSize: 12 }}>{stadiums.location}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2.5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="people" size={15} color={Colors.lightOrange} style={{ marginRight: 5 }} />
              <Text style={{ color: Colors.darkLight, fontSize: 12 }}>{stadiums.size}</Text>
            </View>
            <Text style={{ fontSize: 10, color: Colors.darkLight }}>365 reviews</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
    );
  };
  const CheapstadiumCard = ({stadiums}) => {
    return (
      <View style={style.CheapstadiumCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={Colors.yellew} />
          <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 15}}>
            5.0
          </Text>
        </View>
        <Image style={style.CheapstadiumCardImage} source={stadiums.image} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>{stadiums.name}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: Colors.darkLight
        }}>
            {stadiums.location}
          </Text>
        </View>
      </View>
    );
  };
    useEffect(() => {
      const fetchStadiums = async () => {
        try {
          const response = await axios.get('http://192.168.1.110:3000/#stades');
          setStadiums(response.data);
        } catch (error) {
          console.error(error);
          // Handle error case
        }
      };

      fetchStadiums();
    }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={style.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            Find your Stadium
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: Colors.lightOrange,
              }}>
              {itsUsername}

            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="person-outline" size={38} color={Colors.brand} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={38} color={Colors.brand} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.searchInputContainer}>
          <Icon name="search" size={30} style={{marginLeft: 20}} />
          <TextInput
            placeholder="Search"
            style={{fontSize: 20, paddingLeft: 10}}
          />
        </View>
        <CategoryList />
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            horizontal
            data={stadiums}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card stadiums={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: Colors.brand}}>
            Cheap Stadiums
          </Text>
          <Text style={{color: Colors.darkLight}}>Show all</Text>
        </View>
        <FlatList
          data={stadiums}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({item}) => <CheapstadiumCard stadiums={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: Colors.primary,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: Colors.lightgreen,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 60,
    backgroundColor: Colors.lightOrange,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: Colors.brand,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  CheapstadiumCard: {
    height: 120,
    width: 120,
    backgroundColor: Colors.primary,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  CheapstadiumCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

  

export default Home;