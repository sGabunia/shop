import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../../features/cart/cartSlice';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardItem = ({product, productKey}) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(productKey));
  };
  return (
    <View style={styles.cardItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{product.quantity}</Text>
        {'  '}
        <Text style={styles.mainText}>{product.product}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>$ {product.sum.toFixed(2)}</Text>
        {productKey && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleRemoveFromCart}>
            <MaterialIcons name="remove-shopping-cart" size={16} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  cardItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#888',
    marginRight: 25,
  },
  mainText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 15,
  },
});
