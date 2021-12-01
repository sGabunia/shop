import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../features/cart/cartSlice';

import {selectAllProducts} from '../../features/products/productsSlice';
import colors from '../../constants/colors';

const ProductDetailsScreen = ({route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();

  const product = useSelector(selectAllProducts).find(
    product => product.id === id,
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <ScrollView>
      <Image source={{uri: product.imageUrl}} style={styles.image} />
      <View style={styles.actions}>
        <Button
          onPress={handleAddToCart}
          title="ADD TO CART"
          color={colors.accent}
        />
      </View>
      <Text style={styles.price}>{product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 15,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    textAlign: 'center',
  },
});
