import * as React from 'react';

import { View, StatusBar, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from './helper/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';

const App = () => {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: true,
            userToken: action.token,
            isLoading: false,
          };          
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
        console.log("Error while fetching userToken", e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async loginData => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        let userToken;
        if (loginData.data != null) {
          try {
            userToken=loginData.data.data.authenticate.id;
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log("Error while signing in",e);
          }        
        }
        dispatch({ type: 'SIGN_IN', token: userToken });
      },
      
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      
      signUp: async signUpData => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        try {
          if (signUpData.data.data.register == true) {
            console.log("Successfully completed registration");
          }
        } catch (e) {
          console.log("Error while signing up",e);
        }
        dispatch({ type: 'SIGN_UP' });
      },
      }),

    []
  );

  if( state.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
    <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#307ecc" translucent = {true}/>
    { state.isSignout ? (
      <AuthNavigator/>
    ) :
     state.userToken == null ? (
      <AuthNavigator/>
      ) : (
      <AppNavigator/>
    )  
    }
    </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;