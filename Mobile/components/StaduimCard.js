import React from 'react';
import { View, Text,Animated, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
import { Colors } from "./style";

const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;


const StadiumCard = ({ item, navigation , index }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
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
    outputRange: [0.8, 1, 0.8],});
  const handleStadiumPress = () => {
    navigation.navigate('DetailsScreen', item);
    
  };

  return (
    <TouchableOpacity onPress={handleStadiumPress} 
    disabled={activeCardIndex !== index}
      activeOpacity={1}
    >
      <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
      <Animated.View style={{ ...styles.cardOverLay, opacity }} />
      <Image source={{ uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcP0GqDMRudZ4c6kv2sLgX4ifauSGhvikQEidR9fLSYGOR4YOOb1FkCPZ6u7AHkiF9_lg&usqp=CAU" }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.cardTitle}>{item.title}</Text>

        </View>
        {/* <Text style={styles.cardDescription}>{item.description}</Text> */}
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 2.5,
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="futbol-o" size={14} color={Colors.lightOrange} />
            <Text style={styles.infoText}>{item.sport}</Text>
          </View>

          </View>

          <View style={{  flexDirection: 'row', justifyContent: 'space-between', marginTop: 2.5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="map-marker" size={14} color={Colors.lightOrange} />
            <Text style={styles.infoText}>{item.city}</Text>
            </View>
            
          </View>
       
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2.5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="expand" size={14} color={Colors.lightOrange} />
            <Text style={styles.infoText}>Size: {item.size}</Text>
          </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2.5}}>
          <View style={styles.infoRow}>
            <Icon name="dollar" size={14} color={Colors.lightOrange} />
            <Text style={styles.infoText}>Price: {item.price}</Text>
          </View>
          </View>
          
       <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2.5}}>
       <Text style={styles.cardInfo}>Type: {item.type}</Text>
        <Text style={styles.cardInfo}>Status: {item.status}</Text>
        <Text style={styles.cardInfo}>Reviews: {item.reviews}</Text> 
       </View>
        
      </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    overflow: 'hidden',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.black,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    marginLeft: 4,
    color: Colors.darkGray,
  },
  cardInfo: {
    fontSize: 14,
    marginBottom: 2,
    color: Colors.darkGray,
  },
});

export default StadiumCard;
