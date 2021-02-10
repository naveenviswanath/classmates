import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { AuthContext } from '../helper/AuthContext';
import AppHeader from '../components/AppHeader';

export default function Home({ navigation, route }) {
  
  const { signOut } = React.useContext(AuthContext);

  function clearAsyncStorage() {
    AsyncStorage.clear();
    signOut();
  }

  return (   
    <View style={styles.container}>
      <AppHeader title="Welcome, Naveen" onPress={() => {clearAsyncStorage()}}/>
      <View style={styles.content}>
        
      </View>
      <View style={styles.footer}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307ecc',
  },  
  content: {
    flex: 8,
    alignContent: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  footer: {
    flex: 2,
    flexDirection: 'row-reverse',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },  
});

