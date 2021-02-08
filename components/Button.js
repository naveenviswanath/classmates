import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet } from 'react-native';


export default function Button(props) {    
    return (
            <View>
                <TouchableHighlight style={styles.button} onPress={props.onPress}>
                    <Text style={styles.textStyle}>{props.name.toUpperCase()}</Text>
                </TouchableHighlight>
            </View>
          );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "powderblue",
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.7)",
  },
  textStyle: {
    color: "grey",
    textAlign: "center",
    height: 20,
  },
});