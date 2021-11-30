import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  deleteProduct,
  selectUserProducts,
} from '../../features/products/productsSlice';
import {deleteProductInCart} from '../../features/cart/cartSlice';

import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = () => {
  const userProducts = useSelector(selectUserProducts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDelete = id => {
    dispatch(deleteProduct(id));
    dispatch(deleteProductInCart(id));
  };

  const handleEditProduct = id => {
    navigation.navigate('Edit Product', {
      id,
    });
  };

  const renderItem = ({item}) => {
    return (
      <ProductItem
        product={item}
        leftButtonTitle="Edit"
        rightButtonTitle="Delete"
        handleLeftClick={() => handleEditProduct(item.id)}
        handleRightClick={() => handleDelete(item.id)}
      />
    );
  };
  return (
    <View>
      <FlatList data={userProducts} renderItem={renderItem} />
    </View>
  );
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
