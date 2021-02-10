import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AppHeader(props) { 

    return (
      <View style={styles.header}>
        <View style={styles.header_menu}><Icon.Button name="ios-menu" size={25} backgroundColor='#307ecc' onPress={props.onPress} /></View>
        <View style={styles.header_content}><Text style={styles.text_header}>{props.title}</Text></View>
        <View style={styles.header_logout}><Icon.Button name="ios-log-out" size={25} backgroundColor='#307ecc' onPress={props.onPress} /></View>
      </View>
    );

}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#307ecc',
    paddingTop: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 22,
    paddingTop: 15,
    paddingBottom: 10,
  },
  header_menu: {
    justifyContent: 'center',  
  },
  header_content: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',  
  },
  header_logout: {
    justifyContent: 'center',  
  },
});
