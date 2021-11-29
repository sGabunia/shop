import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomHeaderButton = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <MaterialIcons name="shopping-cart" size={23} />
    </TouchableOpacity>
  );
};

export default CustomHeaderButton;
