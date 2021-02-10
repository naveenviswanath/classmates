import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default function Button(props) {    
    return (
          <View style={styles.buttonLayout}>
          <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <LinearGradient 
              colors={['#307ecd','#307ecc']}
              style={styles.buttonStyle}>
                <Text style={styles.textStyle}>{props.name.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
          );
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontWeight: 'bold'
  },
  buttonLayout: {
    alignItems: 'baseline',
    marginTop: 30,
  },
  buttonStyle: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  }
});