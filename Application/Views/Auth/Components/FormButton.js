import React from 'react';
import {Button} from 'react-native';

const FormButton = ({title, buttonType, buttonColor, ...rest}) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{borderColor: buttonColor, borderRadius: 20}}
    titleStyle={{color: buttonColor}}
  />
);

export default FormButton;
