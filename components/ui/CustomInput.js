import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const CustomInput = props => {
  return (
    <TextInput
      {...props}
      style={styles.input}
      onChangeText={text => props.handleInputChange(text)}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    elevation: 2,
    padding: 15,
  },
});
