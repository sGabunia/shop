import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {selectAllProducts} from '../../features/products/productsSlice';

const EditProductScreen = ({route}) => {
  const product = useSelector(selectAllProducts).find(
    prod => prod.id === route?.params?.id,
  );

  const [title, setTitle] = useState(product ? product.title : '');
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '');
  const [price, setPrice] = useState(product ? product.price.toString() : '');
  const [description, setDescription] = useState(
    product ? product.description : '',
  );

  console.log(price, description);

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
