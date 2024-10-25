import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';

const App = () => {
  const [cart, setCart] = useState([]);
  const products = [
    {id: 1, name: 'Product 1', price: 100},
    {id: 2, name: 'Product 2', price: 150},
    {id: 3, name: 'Product 3', price: 200},
  ];

  const handleAdd = product => {
    // console.log('Product added to cart', product);
    setCart([...cart, product]);
  };

  const handleRemove = product => {
    // console.log('Product removed from cart', product);
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shopping Cart</Text>
      <View>
        <Text style={styles.text}>Products</Text>
        {products.map(product => (
          <View key={product.id} style={styles.cartLine}>
            <Text>
              {product.name} {product.price}
            </Text>
            <TouchableOpacity onPress={() => handleAdd(product)}>
              <Text>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text style={styles.text}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        Object.values(
          cart.reduce((acc, product) => {
            if (!acc[product.id]) {
              acc[product.id] = {...product, quantity: 0, total: 0};
            }
            acc[product.id].quantity += 1;
            acc[product.id].total += product.price;
            return acc;
          }, {}),
        ).map((product, index) => (
          <View key={index} style={styles.cartLine}>
            <Text>
              {product.name} * {product.quantity} = {product.total}
            </Text>
            <TouchableOpacity onPress={() => handleRemove(product)}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <View style={styles.totalLine}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{cart.reduce((acc, product) => acc + product.price, 0)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  cartLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  totalLine:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  text:{
    fontSize: 20,
    fontFamily: 'Arial',
    marginBottom: 20,
  }
});

export default App;
