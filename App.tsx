import React, {useEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/Navigations/RootNavigation';
import configureFirebase from './firebaseConfig';
import { WhiteColor } from './src/Helpers/Constants/Colors';
import ToastComponent from './src/Screens/Components/ToastComponent/ToastComponent';

const App = () => {
  useEffect(() => {
    configureFirebase();
  }, []);

  return (
    <>
      <NavigationContainer>
        <StatusBar
        barStyle={'dark-content'}
        backgroundColor={WhiteColor}
      />
        <RootNavigation />
      </NavigationContainer>
      <ToastComponent />
    </>
  );
};

export default App;
