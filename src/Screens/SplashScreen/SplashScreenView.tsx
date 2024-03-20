import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SplashScreenProps} from './SplashScreenProps';
import useSplashScreenVM from './SplashScreenVM';
import {SvgXml} from 'react-native-svg';
import {logo} from '../../Assets/Images/logo';
import {FC} from 'react';
import {tick} from '../../Assets/Images/tick';
import {cross} from '../../Assets/Images/cross';
import Toast from 'react-native-toast-message';
import React from 'react';
import {SplashScreenStyles} from './SplashScreenStyles';

const SplashScreenView: FC<SplashScreenProps> = props => {
  const {checklogin, validateUser} = useSplashScreenVM(props);

  return (
    <View style={SplashScreenStyles.mainView}>
      <SvgXml xml={logo} width="111" height="51" />
      <Toast
        config={{
          successToast: ({text1, props}) => (
            <View style={SplashScreenStyles.toastStyle}>
              <SvgXml xml={tick}></SvgXml>
              <Text style={SplashScreenStyles.toastText}>{text1}</Text>
              <SvgXml xml={cross}></SvgXml>
            </View>
          ),
          errorToast: ({text1, props}) => (
            <View style={SplashScreenStyles.toastStyle}>
              {/* <SvgXml xml={cross}></SvgXml> */}
              <Text style={SplashScreenStyles.toastText}>{text1}</Text>
              <SvgXml xml={cross}></SvgXml>
            </View>
          ),
        }}
      />
    </View>
  );
};

export default SplashScreenView;
