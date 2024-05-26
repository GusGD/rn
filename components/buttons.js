// Button.js
import React from 'react';
import { Button as RNButton } from 'react-native';

const Button = ({ title, onPress }) => {
  return <RNButton title={title} onPress={onPress} />;
};

export default Button;
