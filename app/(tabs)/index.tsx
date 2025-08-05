import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MyContentScreen from '@/components/MyContentScreen';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <MyContentScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});