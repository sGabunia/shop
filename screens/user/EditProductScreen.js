import React, {useState, useLayoutEffect, useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  addNewProduct,
  selectAllProducts,
  updateProduct,
} from '../../features/products/productsSlice';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EditProductScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const product = useSelector(selectAllProducts).find(
    prod => prod.id === route?.params?.id,
  );

  const [title, setTitle] = useState(product?.title || '');
  const [imageUrl, setImageUrl] = useState(
    product?.imageUrl ||
      'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
  );
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [description, setDescription] = useState(product?.description || '');

  const handleDataSave = useCallback(
    (title, imageUrl, productPrice, description) => {
      const price = Number(productPrice);
      if (product) {
        dispatch(
          updateProduct({
            id: product.id,
            title,
            imageUrl,
            price,
            description,
          }),
        );
      } else {
        dispatch(addNewProduct({title, imageUrl, price, description}));
      }

      navigation.goBack();
    },
    [dispatch, title, imageUrl, price, description],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name="check"
          size={24}
          onPress={() => handleDataSave(title, imageUrl, price, description)}
        />
      ),
    });
  }, [navigation, title, imageUrl, price, description]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={price}
            onChangeText={text => setPrice(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'OpenSans-Bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
