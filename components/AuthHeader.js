import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AuthHeader(props) { 

    return (
      <View style={styles.header}>
        <View style={styles.header_menu}></View>
        <View style={styles.header_content}><Text style={styles.text_header}>{props.title}</Text></View>
        <View style={styles.header_logout}></View>
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
    fontSize: 25,
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
    paddingLeft: 10,  
  },
  header_logout: {
    justifyContent: 'center',  
  },
});
