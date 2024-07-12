

# rn-assignment7-11356857
## Overview
This project is a React Native mobile application that demonstrates a basic e-commerce platform. Users can view a list of products, view detailed information about a product, add products to their cart, and view the items in their cart. The app fetches product data from an external API and uses local storage to manage the cart items.

## Features
- HomeScreen: Displays a list of available products fetched from an external API.
- ProductDetailScreen: Displays detailed information about a selected product.
- CartScreen: Displays the items that have been added to the cart.
- Drawer Navigation: Provides a navigation menu accessible through a swipe gesture or button.
- Add to Cart: Allows users to add products to their cart.
- Remove from Cart: Allows users to remove products from their cart.
- Local Storage: Uses AsyncStorage to store cart items locally on the device.

## Technologies Used
- React Native
- Axios
- AsyncStorage
- React Navigation

## Installation
- Clone the repository:
``bash
git clone https://github.com/schooltech1/rn-assignment7-11356857.git
cd my-app``

- Install dependencies:
``bash
npm install``

- Install required packages:
``bash
npx expo install react-native-gesture-handler@2.16.1 react-native-reanimated@3.10.1 react-native-safe-area-context@4.10.1 react-native-screens@3.31.1``

- Start the application:
``bash
npm start``

## Components
- HomeScreen
  - Displays a list of products fetched from the API. Each product has an image, title, price, and an "ADD TO CART" button.

- ProductDetailScreen
  - Displays detailed information about a selected product, including its image, title, price, and description.

- CartScreen
  - Displays the items added to the cart, along with their images, titles, prices, and a "Remove from Cart" button. Also shows the total price and quantity of items in the 
    cart.

- Drawer
  - Provides navigation options for the app. Accessible through a swipe gesture or a button.

- API Integration
  - The app fetches data from the Fake Store API:
``
const fetchProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    setProducts(response.data);
  } catch (error) {
    console.error(error);
  }
};``

- Local Storage
  - The app uses AsyncStorage to manage cart items:
``
const addToCart = async (product) => {
  try {
    let cart = await AsyncStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart.push(product);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error(error);
  }
};``

``const fetchCart = async () => {
  try {
    let cartItems = await AsyncStorage.getItem('cart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    setCart(cartItems);
  } catch (error) {
    console.error(error);
  }
};``

``const removeFromCart = async (product) => {
  try {
    let cartItems = await AsyncStorage.getItem('cart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  } catch (error) {
    console.error(error);
  }
};``

## Screenshots


https://github.com/user-attachments/assets/f38a9432-a6a4-4b44-8581-09bf0f1707c5



