import React, { useEffect, useState ,useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import * as SecureStore from 'expo-secure-store';

import axios from "axios";
import { Colors } from "../components/style";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const Nome = ({ navigation }) => {
  const [stadiums, setStadiums] = useState([]);
  const categories = ['football', 'basketball', 'handball'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSportCategory, setSelectedSportCategory] = useState('football');
  const [itsUsername, setItsUsername] = useState('');

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [stadiumsByCategory, setStadiumsByCategory] = useState({
    football: [],
    basketball: [],
    handball: [],
  });
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        const username = await SecureStore.getItemAsync('username');
        console.log(token);
        console.log(username);
        setItsUsername(username);
        const response = await axios.get(
          "http://10.0.2.2:8000/api/stades"
        );
        
        setStadiums(response.data);
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchStadiums();
  }, []);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        // Fetch all stadiums
        const response = await axios.get("http://10.0.2.2:8000/api/stades");
        const allStadiums = response.data;
        
        // Separate stadiums by category
        const stadiumsByCat = {
          football: allStadiums.filter((stadium) => stadium.sport === 'football'),
          basketball: allStadiums.filter((stadium) => stadium.sport === 'basketball'),
          handball: allStadiums.filter((stadium) => stadium.sport === 'handball'),
        };
  
        setStadiumsByCategory(stadiumsByCat);
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };
  
    fetchStadiums();
  }, []);
  const CategoryList = ({ navigation }) => {
    return (
      <View style={styles.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedSportCategory(item)}
          >
            <View>
              <Text
                style={{
                  ...styles.categoryListText,
                  color:
                    selectedSportCategory === item
                      ? Colors.green
                      : Colors.silver,
                }}
              >
                {item}
              </Text>
              {selectedSportCategory === item && (
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
  

  const StadiumCard = ({ item, index }) => {
    if (selectedSportCategory && item.sport !== selectedSportCategory) {
      return null; // Render nothing if the stadium sport doesn't match the selected sport category
    }

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
        onPress={() => navigation.navigate('DetailsScreen', item)}
      >
        <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...styles.cardOverLay, opacity }} />
          <View style={styles.priceTag}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {item.price} Dh
            </Text>
          </View>
          <Image
            source={{ uri: `http://10.0.2.2:8000/storage/stades/image/${item.image}` }}
            style={styles.cardImage}
          />
          <View style={styles.cardDetails}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2.5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="place" size={15} color={Colors.lightOrange} style={{ marginRight: 5 }} />
                <Text style={{ color: Colors.darkLight, fontSize: 12 }}>{item.city}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2.5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="expand" size={15} color={Colors.lightOrange} style={{ marginRight: 5 }} />
                <Text style={{ color: Colors.darkLight, fontSize: 12 }}>Size: {item.size}</Text>
              </View>
              <Text style={{ color: Colors.darkLight, fontSize: 15, paddingLeft: 70 }}>{item.reviews}</Text>
              <Icon name="star" color={Colors.lightOrange} style={{ marginLeft: 7, paddingTop: -1 }} size={20} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2.5 }}>
              {/* <Text style={{ color: Colors.darkLight, fontSize: 12 }}>Type: {item.type}</Text> */}
              {/* <Text style={{ color: Colors.darkLight, fontSize: 12 }}>Status: {item.status}</Text> */}
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const CheapstadiumCard = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)}>
        <View style={styles.CheapstadiumCard}>
          <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 1, flexDirection: 'row' }}>
            <Icon name="star" size={15} color={Colors.yellew} />
            <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 15 }}>5.0</Text>
          </View>
          <Image style={styles.CheapstadiumCardImage} source={{ uri: `http://10.0.2.2:8000/storage/stades/image/${item.image}`}} />
          <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: Colors.darkLight }}>{item.city}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={styles.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Find your Stadium</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.lightOrange }}>{itsUsername}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="person-outline" size={38} color={Colors.brand} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryList />
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(Math.round(e.nativeEvent.contentOffset.x / cardWidth));
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true },
            )}
            horizontal
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: (stadiumsByCategory[selectedSportCategory]?.length || 0) * cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            data={stadiumsByCategory[selectedSportCategory] || []}
            snapToInterval={cardWidth}
            renderItem={({ item, index }) => (
              <StadiumCard item={item} navigation={navigation} index={index} snapToInterval={cardWidth} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: Colors.brand}}>
            Best Rated Stadiums
          </Text>
          <Text style={{color: Colors.darkLight}}>Show all</Text>
        </View>
        <FlatList
  data={stadiums.sort((a, b) => b.rating - a.rating).slice(0, 5)}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{
    paddingLeft: 20,
    marginTop: 20,
    paddingBottom: 30,
  }}
  renderItem={({ item }) => <CheapstadiumCard item={item} />}
/>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({

  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
 
  
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchContainer: {
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  searchInput: {
    fontSize: 18,
    color: "#333",
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
  
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  priceTag: {
    height: 60,
    width:100 ,
    backgroundColor: Colors.lightOrange,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: Colors.lightgreen,
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
  cardDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
 
});

export default Nome;
