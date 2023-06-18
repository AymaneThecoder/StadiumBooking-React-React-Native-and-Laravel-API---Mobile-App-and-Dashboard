import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        const response = await axios.get(
          "http://10.0.2.2:8000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "80%", borderRadius: 16 }}>
        <Card.Content>
          <Title style={{ marginBottom: 8 }}>Profile</Title>
          <Paragraph style={{ marginBottom: 16 }}>
            Name: {userData.name}
          </Paragraph>
          <Paragraph style={{ marginBottom: 16 }}>
            Email: {userData.email}
          </Paragraph>
          <Paragraph style={{ marginBottom: 16 }}>
            Phone Number: 0{userData.phone_number}
          </Paragraph>
          {/* Add more fields as needed */}
        </Card.Content>
      </Card>
    </View>
  );
};

export default MyProfile;
