//Import React and Hooks we needed
import * as React from 'react';

//Import all required component
import { Text, View, StyleSheet, Image, StatusBar, Dimensions } from 'react-native';

import Button from '../components/Button';

const {height} = Dimensions.get("screen");
const height_logo = height * 0.35;

export default function Splash({ navigation, route }) {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = React.useState(true);

   React.useEffect(() => {
    
    const setTimeout = (async () => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      userToken = await AsyncStorage.getItem('userToken');
      navigation.navigate(
        userToken === null ? 'Auth' : 'App'
        );
    }, 5000);
  }, []); 

  return (
    <View style={styles.container}>
    <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#307ecc" translucent = {true}/>
     <View style={styles.header}>
      <Image source={require('../assets/images/school.png')} style={styles.logo} resizeMode='stretch' />
     </View>
     <View style={styles.footer}>
        <Text style={styles.title}>Connect with your classmates!</Text>
        <View style={styles.button}>
            <Button name='Get Started' onPress={()=>navigation.navigate('SignIn')} />  
        </View>
     </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307ecc',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
},
text: {
    color: 'grey',
    marginTop:5
},
button: {
    alignItems: 'flex-end',
    marginTop: 30
},
signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
},
textSign: {
    color: 'white',
    fontWeight: 'bold'
}
});