// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList,Image, Button, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Header from '../components/Header'

// const CartScreen = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       let cartItems = await AsyncStorage.getItem('cart');
//       cartItems = cartItems ? JSON.parse(cartItems) : [];
//       setCart(cartItems);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const removeFromCart = async (product) => {
//     try {
//       let cartItems = await AsyncStorage.getItem('cart');
//       cartItems = cartItems ? JSON.parse(cartItems) : [];
//       const updatedCart = cartItems.filter((item) => item.id !== product.id);
//       await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
//       setCart(updatedCart);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const renderCartItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//         <Image source={{ uri: item.image }} style={styles.itemImage} />
//       <Text style={styles.itemTitle}>{item.title}</Text>
//       <Text style={styles.itemPrice}>${item.price}</Text>
//       <Button title="Remove from Cart" onPress={() => removeFromCart(item)} />
//     </View>
//   );

//   return (
//     <View>
//     <Header/>
//     <FlatList
//       data={cart}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderCartItem}
//     />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   itemImage: {
//     width: "100%",
//     height: 150,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   itemPrice: {
//     fontSize: 16,
//     color: '#888',
//   },
// });

// export default CartScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      let cartItems = await AsyncStorage.getItem('cart');
      cartItems = cartItems ? JSON.parse(cartItems) : [];
      setCart(cartItems);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      let cartItems = await AsyncStorage.getItem('cart');
      cartItems = cartItems ? JSON.parse(cartItems) : [];
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const calculateTotalQuantity = () => {
    return cart.length;
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item)}>
        <Image source={require('../assets/remove.png')} style={styles.actionImage} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />
          <View style={styles.totalContainer}>
            <Text> EST. AMOUNT</Text>
            <Text style={styles.totalText}>Total Price: ${calculateTotalPrice()}</Text>
          </View>
          <View style={styles.checkoutSection}>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
        <Image source={require('../assets/shopping bag.png')} style={styles.shoppingBag} />
      </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  removeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  actionImage: {
    width: 30,
    height: 30,
  },
  checkoutSection: {
    backgroundColor:  "#ff6f61",
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
  shoppingBag: { width: 30, height: 30 },
});

export default CartScreen;
