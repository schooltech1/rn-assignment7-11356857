import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import OpenFashionUI from '../components/OpenFashionUI';
import Drawer from '../components/Drawer';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const addToCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error(error);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
      >
        <Text style={styles.viewDetails}>View Details</Text>
      </TouchableOpacity>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <OpenFashionUI/>
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      <TouchableOpacity style={styles.drawerToggle} onPress={toggleDrawer}>
        <Image source={require('../assets/Menu.png')}  />
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    // alignItems: 'flex-start',
  },
  itemImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
    // resizeMode: 'contain'
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 20,
    color: "#888",
    marginBottom: 10,
  },
  viewDetails: {
    color: "#ff6f61",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  drawerToggle: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    zIndex: 1,
  },
  drawerToggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
