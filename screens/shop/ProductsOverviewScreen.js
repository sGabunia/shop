import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {selectAllProducts} from '../../features/products/productsSlice';

import {addToCart} from '../../features/cart/cartSlice';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = () => {
  const products = useSelector(selectAllProducts);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showProductDetails = product => {
    navigation.navigate('Product Details', {
      title: product.title,
      id: product.id,
    });
  };

  const showCart = product => {
    dispatch(addToCart(product));
  };

  const renderItem = ({item}) => {
    return (
      <ProductItem
        product={item}
        handleLeftClick={() => showProductDetails(item)}
        handleRightClick={() => showCart(item)}
      />
    );
  };

  return (
    <View>
      <FlatList data={products} renderItem={renderItem} />
    </View>
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
