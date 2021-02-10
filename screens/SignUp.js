import React, { useState } from "react";
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Button from '../components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../helper/AuthContext';
import AuthHeader from '../components/AuthHeader';

const {width} = Dimensions.get("screen");
const {height} = Dimensions.get("screen");
const height_logo = height * 0.35;

export default function SignUp({ navigation, route }) {
  
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    hasModified: false,
    secureTextEntry: true,
    isValidEmail: false,
    isValidPassword: true,
  });

  const handleFirstName = (val) => {
    setData({
      ...data,
      firstName: val
  });
  }

  const handleLastName = (val) => {
        setData({
            ...data,
            lastName: val
        });
  }
  
  const handleEmail = (val) => {
    if( val.trim().length >= 4 ) {
        setData({
            ...data,
            email: val,
            hasModified: true,
            isValidEmail: true
        });
    } else {
        setData({
            ...data,
            email: val,
            hasModified: false,
            isValidEmail: false
        });
    }
  }

  const handlePassword = (val) => {
    if( val.trim().length >= 8 ) {
        setData({
            ...data,
            password: val,
            isValidPassword: true
        });
    } else {
        setData({
            ...data,
            password: val,
            isValidPassword: false
        });
    }
  }

  const toggleSecureTextEntry = (val) => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
  }

  const [errortext, setErrortext] = React.useState('');

  const { signUp } = React.useContext(AuthContext);
  
  let signupUrl = 'http://192.168.122.1:45009/aquamate/graphql';

  const register = ( firstName, lastName, email, password) => {

    if (!firstName) {
      alert('Please enter FirstName');
      return;
    }
    if (!lastName) {
      alert('Please enter LastName');
      return;
    }
    if (!email) {
      alert('Please enter Email');
      return;
    }
    if (!password) {
      alert('Please enter Password');
      return;
    }

    let body =  { 
      query: `mutation { 
              register(firstName: "${firstName}" , lastName: "${lastName}", emailID: "${email}" , password: "${password}") 
            }`, 
      variables: {}
    }

    let options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
      axios.post(signupUrl,body, options)
        .then((response)=>{
          console.log(response.data);
          signUp(response);
        });
    } catch (error) {
          console.error();
    }

  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
    <AuthHeader title="Register!" />
    <SafeAreaView style={styles.content}>
    <ScrollView >
      <Text style={[styles.text_footer, {marginTop: 10}]}>First Name</Text>
      <View style={styles.formSection}>
          <FontAwesome 
                name="user-o"
                color="gray"
                size={20} />              
          <TextInput 
            defaultValue='' 
            onChangeText={(val) => handleFirstName(val)}
            autoCapitalize="none" 
            placeholder="Enter FirstName" 
            style={styles.textInput} />
          {data.isValidEmail ?
            <Feather 
            name="check-circle"
            color="green"
            size={20} /> 
          : null }         
      </View>
      <Text style={[styles.text_footer, {marginTop: 10}]} >Last Name</Text>
      <View style={styles.formSection}>
          <FontAwesome 
                name="user"
                color="gray"
                size={20} />              
          <TextInput 
            defaultValue='' 
            onChangeText={(val) => handleLastName(val)}
            autoCapitalize="none" 
            placeholder="Enter LastName" 
            style={styles.textInput} />
          {data.isValidEmail ?
            <Feather 
            name="check-circle"
            color="green"
            size={20} /> 
          : null }         
      </View>
      <Text style={[styles.text_footer, {marginTop: 10}]} >Email</Text>
      <View style={styles.formSection}>
          <FontAwesome 
                name="envelope-o"
                color="gray"
                size={20} />              
          <TextInput 
            defaultValue='' 
            onChangeText={(val) => handleEmail(val)}
            autoCapitalize="none" 
            placeholder="Enter EmailID" 
            style={styles.textInput} />
          {data.isValidEmail ?
            <Feather 
            name="check-circle"
            color="green"
            size={20} /> 
          : null }         
      </View>
      <Text style={[styles.text_footer, {marginTop: 10}]} >Password</Text>
      <View style={styles.formSection}>
          <FontAwesome 
                name="lock"
                color="gray"
                size={20} />              
          <TextInput 
            defaultValue='' 
            onChangeText={(val) => handlePassword(val)}
            autoCapitalize="none" 
            secureTextEntry={data.secureTextEntry ? true : false}
            placeholder="Enter Password" 
            style={styles.textInput} />
          <TouchableOpacity
                  onPress={toggleSecureTextEntry}>
                  {data.secureTextEntry ? 
                  <Feather 
                      name="eye-off"
                      color="grey"
                      size={20}
                  />
                  :
                  <Feather 
                      name="eye"
                      color="grey"
                      size={20}
                  />
                  }
          </TouchableOpacity>   
      </View>
      {data.isValidPassword ? null :
          <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
      }
      <Text style={[styles.text_footer, {marginTop: 10}]} >Confirm Password</Text>
      <View style={styles.formSection}>
          <FontAwesome 
                name="lock"
                color="gray"
                size={20} />              
          <TextInput 
            defaultValue='' 
            onChangeText={(val) => handlePassword(val)}
            autoCapitalize="none" 
            secureTextEntry={data.secureTextEntry ? true : false}
            placeholder="Re-Enter Password" 
            style={styles.textInput} />
          <TouchableOpacity
                  onPress={toggleSecureTextEntry}>
                  {data.secureTextEntry ? 
                  <Feather 
                      name="eye-off"
                      color="grey"
                      size={20}
                  />
                  :
                  <Feather 
                      name="eye"
                      color="grey"
                      size={20}
                  />
                  }
          </TouchableOpacity>   
      </View>
      {data.isValidPassword ? null :
          <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
      }                     
    </ScrollView>
    </SafeAreaView>
    <View style={styles.footer}>                
      <View style={styles.buttonLayout}>
          <Button name="Register" onPress={() => {register(data.firstName, data.lastName, data.email, data.password)}}/>
      </View>  
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307ecc',
  },
  image: {
    flex: 2,
    backgroundColor: '#307ecc',
    justifyContent: 'center',
    alignItems: 'center'
  },  
  content: {
    flex: 4,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footer: {
    flex: 1,
    paddingTop:10,
    backgroundColor: 'white',
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 15,
  },
  formSection: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 1,
    
  },
  formSectionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  buttonLayout: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  buttonStyle: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  }       
});
