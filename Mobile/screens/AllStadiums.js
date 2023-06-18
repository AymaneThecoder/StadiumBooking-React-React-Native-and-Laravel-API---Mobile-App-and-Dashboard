
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const ALLStadiums = () => {
const [stades, setStades] = useState([]);

useEffect(() => {
fetchStades();
}, []);

const fetchStades = async () => {
try {
const response = await axios.get('http://10.0.2.2:8000/api/stades');
const data = response.data;
setStades(data);
} catch (error) {
console.error('Error fetching stades:', error);
}
};

const renderStadeItem = ({ item }) => (
<Card style={styles.card}>

<Image source={{ uri:`http://10.0.2.2:8000/storage/stades/image/${item.image}` }} style={styles.cardImage} />

<Card.Content style={styles.cardContent}>
<Text style={styles.cardTitle}>{item.title}</Text>
<Text style={styles.cardDescription}>{item.description}</Text>
</Card.Content>
<Card.Actions style={styles.cardActions}>
<IconButton icon={() => <Icon name="heart" size={20} />} onPress={() => console.log('Pressed')} />
<IconButton icon={() => <Icon name="share" size={20} />} onPress={() => console.log('Pressed')} />
</Card.Actions>
</Card>
);

return (
<View style={styles.container}>
<Text style={styles.header}>All Stadiums ({stades.length})</Text>
<FlatList
data={stades}
renderItem={renderStadeItem}
keyExtractor={(item) => item.id.toString()}
contentContainerStyle={styles.list}
/>
</View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginVertical: 10,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
  },
  cardImage: {
    height: 150, // Adjust the height as needed
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
});

export default ALLStadiums;
