import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../components/style';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkInTime, setCheckInTime] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [checkOutTime, setCheckOutTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(item.price);


  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const storedToken = await SecureStore.getItemAsync('token');
    setToken(storedToken);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkInDate;
    setShowPicker(Platform.OS === 'ios');
    setCheckInDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || checkInTime;
    setShowPicker(Platform.OS === 'ios');
    setCheckInTime(currentTime);
  };

  const handleCheckOutDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkOutDate;
    setShowPicker(Platform.OS === 'ios');
    setCheckOutDate(currentDate);
  };

  const handleCheckOutTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || checkOutTime;
    setShowPicker(Platform.OS === 'ios');
    setCheckOutTime(currentTime);
  
    const checkInDateTime = new Date(checkInDate);
    checkInDateTime.setHours(checkInTime.getHours());
    checkInDateTime.setMinutes(checkInTime.getMinutes());
  
    const checkOutDateTime = new Date(checkOutDate);
    checkOutDateTime.setHours(currentTime.getHours());
    checkOutDateTime.setMinutes(currentTime.getMinutes());
  
    const timeDiffInHours = (checkOutDateTime - checkInDateTime) / (1000 * 60 * 60);
    let calculatedPrice = item.price;
  
    if (timeDiffInHours > 1) {
      calculatedPrice *= 2;
    }
  
    setTotalPrice(calculatedPrice);
  };
  

  const bookStade = () => {
    const checkInDateTime = new Date(checkInDate);
    checkInDateTime.setHours(checkInTime.getHours());
    checkInDateTime.setMinutes(checkInTime.getMinutes());
  
    const checkOutDateTime = new Date(checkOutDate);
    checkOutDateTime.setHours(checkOutTime.getHours());
    checkOutDateTime.setMinutes(checkOutTime.getMinutes());
  
    const timeDiffInHours = (checkOutDateTime - checkInDateTime) / (1000 * 60 * 60);
    let calculatedPrice = item.price;
  
    if (timeDiffInHours > 1) {
      calculatedPrice *= 2;
    }
  
    const bookingData = {
      stade_id: item.id,
      date: checkInDateTime.toISOString().split('T')[0],
      checkin_time: checkInDateTime.toISOString().split('T')[1].split('.')[0],
      checkout_time: checkOutDateTime.toISOString().split('T')[1].split('.')[0],
      totalprice: calculatedPrice,
      status: 'confirmed',
    };
  
    axios
      .post('http://10.0.2.2:8000/api/booking', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 201) {
          // Created - Data Inserted
          alert(res.data.message);
        } else if (res.data.status === 409) {
          // Already added to cart
          alert(res.data.message);
        } else if (res.data.status === 401) {
          // Unauthenticated
          alert(res.data.message);
        } else if (res.data.status === 404 || res.data.status === 400) {
          // Not Found or Bad Request
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases here
      });
  };
  


  const showDateTimePicker = (picker) => {
    setShowPicker(picker);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: Colors.primary,
        paddingBottom: 20,
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground
        style={styles.headerImage}
        source={{
          uri: `http://10.0.2.2:8000/storage/stades/image/${item.image}`,
        }}
      >
        <View style={styles.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={Colors.silver}
            onPress={navigation.goBack}
          />
          <Icon name="bookmark-border" size={28} color={Colors.darkLight} />
        </View>
      </ImageBackground>
      <View>
        <View style={styles.iconContainer}>
          <Icon name="place" color={Colors.green} size={28} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={styles.subtitle}>{item.city}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.description}</Text>
          <Text style={styles.subtitle}>{item.size}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              <Icon name="star" size={20} color={Colors.yellew} />
              <Icon name="star" size={20} color={Colors.yellew} />
              <Icon name="star" size={20} color={Colors.yellew} />
              <Icon name="star" size={20} color={Colors.yellew} />
              <Icon name="star" size={20} color={Colors.silver} />
            </View>
            <Text style={styles.ratingText}>4.0</Text>
            <Text style={styles.reviewText}>365 reviews</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.detailsText}>{item.details}</Text>
          </View>
        </View>
        <View style={styles.container}>
      <View style={styles.row}>
        <Icon name="date-range" size={28} color={Colors.green} />
        <Text style={styles.dateText}>
          {checkInDate.toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.row}>
        <Icon name="alarm" size={28} color={Colors.green} />
        <Text style={styles.timeText}>
          Check-in Time: {checkInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

        </Text>
      </View>
      <View style={styles.row}>
        <Icon name="alarm" size={28} color={Colors.green} />
        <Text style={styles.timeText}>
          Check-out Time: {checkOutTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Select  Date"
            onPress={() => showDateTimePicker('checkInDate')}
            color={Colors.lightgreen}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Select Check-in Time"
            onPress={() => showDateTimePicker('checkInTime')}
            color={Colors.lightOrange}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Select Check-out Time"
            onPress={() => showDateTimePicker('checkOutTime')}
            color={Colors.lightOrange}
          />
        </View>
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={showPicker === 'checkInDate' ? checkInDate : showPicker === 'checkInTime' ? checkInTime : showPicker === 'checkOutDate' ? checkOutDate : checkOutTime}
            mode={showPicker.includes('Date') ? 'date' : 'time'}
            is24Hour={true}
            display="default"
            onChange={
              showPicker.includes('Date')
                ? showPicker === 'checkInDate'
                  ? handleDateChange
                  : handleCheckOutDateChange
                : showPicker === 'checkInTime'
                ? handleTimeChange
                : handleCheckOutTimeChange
            }
          />
        )}
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Price per Hour</Text>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{totalPrice} Dh</Text>
          </View>
        </View>
              {errorMessage !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

        <View style={styles.bookNowButton}>
          <Button title="Book Now" onPress={bookStade} color={Colors.green} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: 150,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: Colors.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    color: Colors.darkLight,
  },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    color: Colors.dark,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  ratingText: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    color: Colors.darkLight,
    marginRight: 10,
  },
  reviewText: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    color: Colors.darkLight,
  },
  detailsText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: Colors.darkLight,
  },
  selectedDateText: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    color: Colors.dark,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  priceContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.silver,
    marginTop: 20,
    marginHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTitle: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    color: Colors.dark,
  },
  priceTag: {
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceText: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    color: Colors.dark,
  },
  bookNowButton: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  errorContainer: {
    backgroundColor: Colors.red,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: Colors.white,
    textAlign: 'center',
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.dark,
  },
  timeText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.dark,
  },
});

export default DetailsScreen;
