import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header(props) { 

    return (
      <View>
        <Text style={styles.headerText}>{props.title}</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'powderblue',
  },
  headerText: {
    color: 'grey',
    fontSize: 22,
    fontWeight: '500'
  }
});
