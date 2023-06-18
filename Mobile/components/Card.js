import React from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
import { Colors } from "./style";

const Card = ({ stadiums, index, scrollX, activeCardIndex, navigation }) => {
  const cardWidth = 250; // Replace with your desired card width

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
      <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
        <Animated.View style={{ ...styles.cardOverlay, opacity }} />
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{stadiums.price} Dh</Text>
        </View>
        <Image source={stadiums.image} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <View style={styles.rowContainer}>
            <Text style={styles.stadiumName}>{stadiums.name}</Text>
            <Icon name="your-sports-icon" size={26} color={stadiums.color} />
          </View>
          <View style={styles.rowContainer}>
            <Icon name="place" size={15} color={Colors.lightOrange} style={styles.icon} />
            <Text style={styles.locationText}>{stadiums.location}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Icon name="people" size={15} color={Colors.lightOrange} style={styles.icon} />
            <Text style={styles.sizeText}>{stadiums.size}</Text>
            <Text style={styles.reviewsText}>365 reviews</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = {
  card: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
    elevation: 4,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  priceText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardDetails: {
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stadiumName: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  icon: {
    marginRight: 5,
  },
  locationText: {
    color: Colors.darkLight,
    fontSize: 12,
  },
  sizeText: {
    color: Colors.darkLight,
    fontSize: 12,
  },
  reviewsText: {
    fontSize: 10,
    color: Colors.darkLight,
  },
};
