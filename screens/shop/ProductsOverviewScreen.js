import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import {selectAllProducts} from '../../features/products/productsSlice';

const ProductsOverviewScreen = () => {
  const products = useSelector(selectAllProducts);

  const renderItem = ({item}) => {
    return <ProductItem product={item} />;
  };

  return (
    <View>
      <FlatList data={products} renderItem={renderItem} />
    </View>
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
