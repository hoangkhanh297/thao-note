import React from 'react';
import {
  View,
  Text,
} from 'react-native';
const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};
const NonTask = props => {
  const { text } = props;
  return (
    <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }} >
      <Text style={{ color: COLOR.pinkColor, fontSize: 15, fontWeight: '400' }}>{text}</Text>
    </View>
  );
};

export default NonTask;