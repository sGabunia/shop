import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  fetchProducts,
  selectAllProducts,
  selectProductsError,
  selectProductsStatus,
} from '../../features/products/productsSlice';

import {addToCart} from '../../features/cart/cartSlice';

import ProductItem from '../../components/shop/ProductItem';
import colors from '../../constants/colors';

const ProductsOverviewScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

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

  if (status === 'idle' || status === 'loading') {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.centerContent}>
        <Text>You've got error</Text>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList data={products} renderItem={renderItem} />
    </View>
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 17,
    color: 'red',
  },
});
