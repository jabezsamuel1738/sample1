import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Styles} from './MaintenanceScreenStyles';
import Header from '../Components/HeaderComponent/HeaderView';
import {Image, Text} from 'react-native';
import {View} from 'react-native-animatable';

const MaintenanceScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={Styles.container}>
        <Header />
        <View style={Styles.body}>
          <Image
            source={require('../../Assets/Images/maintenance.png')}
            style={Styles.imageStyle}
          />
          <Text style = {Styles.mainText}>We’ll be back shortly</Text>
          <View style = {Styles.textCotainer}>
            <Text style = {Styles.descText}>
            We're sprucing things up! Thanks for your patience – we'll be back in no time!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MaintenanceScreen;
