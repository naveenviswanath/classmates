import React from 'react';
import {View, TextInput, StyleSheet } from 'react-native';


export default function FormInput(props) {    

    return (
            <View>
              <TextInput 
                defaultValue={props.defaultValue} 
                onChangeText={props.onChangeText} 
                placeholder={props.placeholder} 
                secureTextEntry={props.secureTextEntry}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                keyboardType={props.keyboardType}
                style={styles.textInput} />
            </View>
          );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "silver",
    borderBottomWidth: 0.5,
    marginBottom: 20
  },
});