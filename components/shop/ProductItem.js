import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../features/cart/cartSlice';

import {StyleSheet, Text, View, Image, Button, Pressable} from 'react-native';
import colors from '../../constants/colors';

const ProductItem = ({product}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showProductDetails = () => {
    navigation.navigate('Product Details', {
      title: product.title,
      id: product.id,
    });
  };

  const showCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Pressable onPress={showProductDetails}>
      <View style={styles.product}>
        <Image source={{uri: product.imageUrl}} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.actions}>
          <Button
            title="View Details"
            onPress={showProductDetails}
            color={colors.accent}
          />
          <Button title="To Cart" color={colors.accent} onPress={showCart} />
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
  },
  price: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
});
