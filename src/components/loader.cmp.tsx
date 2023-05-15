import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../theme/Colors';

const windowHeight = Dimensions.get('window').height;

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator color={Colors.sandyBrown} size={'large'} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight - windowHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
