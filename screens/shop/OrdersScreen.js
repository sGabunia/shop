import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import {selectOrders} from '../../features/cart/ordersSlice';

const OrdersScreen = () => {
  const orders = useSelector(selectOrders);

  if (orders.length === 0) {
    return (
      <View style={styles.noOrders}>
        <Text>Your have no orders</Text>
      </View>
    );
  }

  const renderItem = ({item}) => {
    return <OrderItem order={item} orders={orders} />;
  };
  return (
    <View>
      <FlatList data={orders} renderItem={renderItem} />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  noOrders: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
