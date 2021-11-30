import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {clearCart, selectCart} from '../../features/cart/cartSlice';
import {addOrder} from '../../features/cart/ordersSlice';

import colors from '../../constants/colors';
import CardItem from '../../components/shop/CardItem';

const CartScreen = () => {
  const dispatch = useDispatch();
  const {items, totalAmount} = useSelector(selectCart);

  const itemsArray = Object.entries(items);

  const renderItem = ({item}) => {
    const [key, product] = item;

    return <CardItem product={product} productKey={key} />;
  };

  const makeOrder = () => {
    dispatch(addOrder(itemsArray, totalAmount));
    dispatch(clearCart());
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>{Math.abs(totalAmount).toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={colors.accent}
          onPress={makeOrder}
          disabled={itemsArray.length === 0}
        />
      </View>
      <FlatList
        data={itemsArray}
        keyExtractor={([key]) => key}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    elevation: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  summaryText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
