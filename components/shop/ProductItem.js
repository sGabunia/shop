import React from 'react';

import {StyleSheet, Text, View, Image, Button, Pressable} from 'react-native';
import colors from '../../constants/colors';

const ProductItem = ({
  product,
  leftButtonTitle = 'View Details',
  rightButtonTitle = 'To Cart',
  handleLeftClick,
  handleRightClick,
}) => {
  return (
    <Pressable onPress={handleLeftClick}>
      <View style={styles.product}>
        <Image source={{uri: product.imageUrl}} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price?.toFixed(2)}</Text>
        <View style={styles.actions}>
          <Button
            title={leftButtonTitle}
            onPress={handleLeftClick}
            color={colors.accent}
          />
          <Button
            title={rightButtonTitle}
            onPress={handleRightClick}
            color={colors.accent}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
  },
  price: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
});
