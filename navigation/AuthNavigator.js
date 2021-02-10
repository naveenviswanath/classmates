import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/Splash';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const LoginStack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Splash';

export default function AuthNavigator({ navigation, route }) {
  
  return (
    <LoginStack.Navigator headerMode="none" initialRouteName={INITIAL_ROUTE_NAME}>
      <LoginStack.Screen name="Splash" component={Splash} />
      <LoginStack.Screen name="SignIn" component={SignIn} />
      <LoginStack.Screen name="SignUp" component={SignUp} />
    </LoginStack.Navigator>   
  );
}