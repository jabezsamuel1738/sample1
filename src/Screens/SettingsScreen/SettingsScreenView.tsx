import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/HeaderComponent/HeaderView';
import CustomSwitch from '../Components/SwitchComponent/CustomSwitch';
import { SettingsScreenProps } from './SettingsScreenProps';
import { Styles } from './SettingsScreenStyles';
import useSettingsScreenVM from './SettingsScreenVM';
import { AboutDarkInfo } from '../../Assets/Images/AboutDarkInfo';

const SettingsScreenView: FC<SettingsScreenProps> = props => {
  const {
    moveToAbout,
    downLoad,
    setdownLoad,
    setupload,
    upload,
    changeUpload,
    changeDownload,
  } = useSettingsScreenVM(props);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Styles.container}>
        <Header isPrimaryNeed navigateToAbout={moveToAbout} aboutIcon={AboutDarkInfo}/>
        <Text style={Styles.heading}>Settings</Text>
        <View style={Styles.optionsContainer}>
          <Text style={Styles.optionsText}>Upload Changes</Text>
          <CustomSwitch value={upload} onValueChange={changeUpload} />
        </View>
        <View style={Styles.optionsContainer}>
          <Text style={Styles.optionsText}>Download Latest</Text>
          <CustomSwitch value={downLoad} onValueChange={changeDownload} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SettingsScreenView;
