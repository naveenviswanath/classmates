import * as React from "react";
import axios from 'axios';
import { KeyboardAvoidingView, Platform, StyleSheet, View, TextInput, Text, Dimensions, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';

import Button from '../components/Button';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../helper/AuthContext';
import AuthHeader from '../components/AuthHeader';

const {width} = Dimensions.get("screen");
const {height} = Dimensions.get("screen");
const height_logo = height * 0.35;

export default function SignIn({ navigation, route }) {

  const [data, setData] = React.useState({
    email: '',
    password: '',
    hasModified: false,
    secureTextEntry: true,
    isValidEmail: false,
    isValidPassword: true,
  });

  const [errortext, setErrortext] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  let loginUrl = 'http://192.168.122.1:45009/aquamate/graphql';
  
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
  };

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
  };

  const toggleSecureTextEntry = (val) => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
  };
  
  const handleLogin = ( email, password) => {
    
    setErrortext('');
    
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
  
    let body =  { 
        query: `{ 
                authenticate(emailID: "${email}" , password: "${password}") {
                    id
                    firstName
                    lastName
                }
              }`, 
        variables: {}
    }
    let options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
      axios.post(loginUrl,body, options)
        .then((response)=>{
          signIn(response);
          console.log(response.data);
        });
    } catch (error) {
          console.error();
    }

}

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "center"} >
    <AuthHeader title="Login" />
    <View style={styles.image}>
      <Image source={require('../assets/images/school.png')} style={styles.logo} resizeMode='center' />
    </View>
    <SafeAreaView style={styles.content}>
      <Text style={styles.text_footer} >Email</Text>
      <View style={styles.formSection}>
          <FontAwesome 
                name="user-o"
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
      <Text style={[styles.text_footer, {marginTop: 35}]} >Password</Text>
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
      <TouchableOpacity>
          <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
      </TouchableOpacity>   
    </SafeAreaView>
    <View style={styles.footer}>
      <View style={styles.buttonLayout}>
          <Button name="Sign-In" onPress={() => {handleLogin(data.email, data.password)}}/>
          <Button name="Register" onPress={()=>navigation.navigate('SignUp')}/>
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
    flex: 4,
    backgroundColor: '#307ecc',
    justifyContent: 'center',
    alignItems: 'center'
  },  
  content: {
    flex: 3,
    backgroundColor: 'white',
    paddingVertical: 50,
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
      fontSize: 18,
  },
  formSection: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    
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
    justifyContent: 'space-between',
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
