import React from 'react';

import {StyleSheet, View, TextInput} from 'react-native';

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      {...rest}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15,
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default FormInput;
