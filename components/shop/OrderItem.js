import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../constants/colors';
import CardItem from './CardItem';

const OrderItem = ({order}) => {
  const navigation = useNavigation();
  const [isDetailsShown, setIsDetailsShown] = useState(false);
  const {items} = order;

  useEffect(() => {
    navigation.addListener('blur', () => {
      setIsDetailsShown(false);
    });
  }, [navigation]);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>$ {order.total.toFixed(2)}</Text>
        <Text style={styles.date}>{order.date}</Text>
      </View>
      <Button
        title={isDetailsShown ? 'Hide Details' : 'Show Details'}
        color={colors.primary}
        onPress={() => setIsDetailsShown(prev => !prev)}
      />
      {isDetailsShown &&
        items.map((product, index) => (
          <CardItem product={product} key={index} />
        ))}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    overflow: 'hidden',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  total: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
  },
});
