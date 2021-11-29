import React from 'react';
import {useSelector} from 'react-redux';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  selectAllProducts,
  selectProduct,
} from '../../features/products/productsSlice';
import colors from '../../constants/colors';

const ProductDetailsScreen = ({route}) => {
  const {id} = route.params;

  const product = useSelector(selectAllProducts).find(
    product => product.id === id,
  );

  console.log(product);

  return (
    <ScrollView>
      <Image source={{uri: product.imageUrl}} style={styles.image} />
      <View style={styles.actions}>
        <Button
          onPress={() => console.log('hello')}
          title="ADD TO CART"
          color={colors.primary}
        />
      </View>
      <Text style={styles.price}>{product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 15,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    textAlign: 'center',
  },
});
