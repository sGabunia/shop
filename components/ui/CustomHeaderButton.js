import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {selectCart} from '../../features/cart/cartSlice';

const CustomHeaderButton = () => {
  const navigation = useNavigation();
  const {items} = useSelector(selectCart);

  const quantity = Object.values(items).reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <View>
        <Text style={styles.icon}>{!quantity ? 0 : quantity}</Text>
        <MaterialIcons name="shopping-cart" size={40} />
      </View>
    </TouchableOpacity>
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    color: '#fff',
    top: 5,
    right: 15,
    zIndex: 10,
    fontSize: 13,
  },
});
