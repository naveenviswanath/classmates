# classmates
Platform to connect with your classmates

How to install and run the app?

Pre-Requisite
Ensure Android emulator is running on your machine

a.Checkout the code to any folder
b.Run the below commands from terminal to install the required react native libraries
    cd <foldername>
    yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view react-native-vector-icons react-native-elements
    yarn add @react-navigation/native @react-navigation/stack @react-navigation/core @react-navigation/bottom-tabs
    yarn add @react-native-community/async-storage
    npx react-native link react-native-vector-icons

c) Modify gradle-wrapper.properties to use version 6.3 or later

c.Run the below commands from terminal to start the application
    npx react-native start

    npx react-native run-android
