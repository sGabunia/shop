import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';

const CustomEdditButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Edit Product')}>
      <MaterialIcons name="edit" size={24} />
    </TouchableOpacity>
  );
};

export default CustomEdditButton;
