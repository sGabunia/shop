import React from 'react';
import {View, FlatList, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  deleteProduct,
  selectProductsError,
  selectUserProducts,
  selectAllProducts,
  updateError,
} from '../../features/products/productsSlice';
import {deleteProductInCart} from '../../features/cart/cartSlice';

import ProductItem from '../../components/shop/ProductItem';
import {selectUserId} from '../../features/user/authSlice';

const UserProductsScreen = () => {
  const userId = useSelector(selectUserId);
  const userProducts = useSelector(selectAllProducts).filter(
    product => product.ownerId === userId,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const error = useSelector(selectProductsError);

  const handleDelete = id => {
    Alert.alert('Detele product', 'Do you wish to delete this product?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          dispatch(deleteProduct(id));
          dispatch(deleteProductInCart(id));
        },
      },
    ]);
  };

  const handleEditProduct = id => {
    navigation.navigate('Edit Product', {
      id,
    });
  };

  if (error === 'Permission denied') {
    Alert.alert('You have no permission to delete', 'You must be signed in', [
      {
        text: 'OK',
        onPress: () => {
          dispatch(updateError());
        },
      },
    ]);
  }

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
