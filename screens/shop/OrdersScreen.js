import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import {
  fetchOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersStatus,
} from '../../features/cart/ordersSlice';

import colors from '../../constants/colors';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const status = useSelector(selectOrdersStatus);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const renderItem = ({item}) => {
    return <OrderItem order={item} />;
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

  if (orders.length === 0) {
    return (
      <View style={styles.noOrders}>
        <Text>Your have no orders</Text>
      </View>
    );
  }

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
