import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        const response = await axios.get("http://10.0.2.2:8000/api/bookings", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (response.data && response.data.status === 200) {
          setBookings(response.data.bookings);
        } else {
          // Handle error case
          console.error(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        // Handle error case
      }
    };

    fetchUserBookings();
  }, []);

  const handleCancelReservation = async (bookingId) => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");

      console.log("token :", storedToken); // Log the cancellation response

      console.log("Booking ID:", bookingId); // Log the booking ID
      const response = await axios.delete(`http://10.0.2.2:8000/api/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log("Cancellation Response:", response.data); // Log the cancellation response
      if (response.data && response.data.status === 200) {
        // Remove the cancelled booking from the state
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
        Alert.alert("Success", "Booking cancelled successfully!");
      } else {
        // Handle error case
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingContainer}>
      <View style={styles.cardContainer}>
        <Text style={styles.label}>Stadium Name:</Text>
        <Text style={styles.text}>{item.stade_name}</Text>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.text}>{item.date}</Text>
        <Text style={styles.label}>Check-in Time:</Text>
        <Text style={styles.text}>{item.checkin_time}</Text>
        <Text style={styles.label}>Check-out Time:</Text>
        <Text style={styles.text}>{item.checkout_time}</Text>
        <Text style={styles.label}>Total Price:</Text>
        <Text style={styles.text}>{item.totalprice}</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelReservation(item.id)}
        >
          <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noBookingsText}>No bookings found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#202124",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  noBookingsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#ffffff",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  bookingContainer: {
    marginBottom: 16,
    backgroundColor: "#383a3e",
    padding: 16,
    borderRadius: 8,
  },
  cardContainer: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#ff5a5f",
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UserBookings;
