import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const CustomBurgerButton = () => {
  const navigation = useNavigation();
  return (
    <MaterialIcons
      name="menu"
      size={27}
      onPress={() => navigation.toggleDrawer()}
    />
  );
};

export default CustomBurgerButton;

const styles = StyleSheet.create({});
