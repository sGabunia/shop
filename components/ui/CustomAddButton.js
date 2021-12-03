import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';

const CustomAddButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Edit Product')}>
      <MaterialIcons name="add" size={24} />
    </TouchableOpacity>
  );
};

export default CustomAddButton;
