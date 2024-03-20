import React, {FC} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {Camera} from 'react-native-vision-camera';
import {logo} from '../../Assets/Images/logo';
import {setting} from '../../Assets/Images/setting';
import {ScanScreenProps} from './ScanScreenProps';
import {Styles} from './ScanScreenStyles';
import useScanScreenVM from './ScanScreenVM';

const ScanScreenView: FC<ScanScreenProps> = props => {
  const {
    codeScanner,
    device,
    hasPermission,
    isCameraActive,
    isFetching,
    request,
    requestPermission,
    setCameraActive,
    setIsFetching,
  } = useScanScreenVM(props);

  return (
    <View style={Styles.container}>
      {isCameraActive && device ? (
        <>
          <Camera
            style={Styles.scannerContainer}
            device={device}
            isActive={isCameraActive}
            codeScanner={codeScanner}
          />
        </>
      ) : (
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1, paddingTop: 50, paddingBottom: 100}}>
            <View style={Styles.infoContainer}>
              <SvgXml xml={logo} width="111" height="51" />
              <View style={Styles.errorContainer}>
                <Text style={Styles.heading}>Oops!</Text>
                <Text style={Styles.infoText}>It looks like we couldn't</Text>
                <Text style={[Styles.infoText, {marginBottom: 20}]}>
                  open camera
                </Text>
                <Text style={Styles.infoText}>Tap the cog to update</Text>
                <Text style={Styles.infoText}>your preference</Text>
                <View style={Styles.cogContainer}>
                  <TouchableOpacity
                    style={Styles.cogButton}
                    onPress={() => {
                      Linking.openSettings();
                    }}>
                    <SvgXml xml={setting} width={'70%'} height={'70%'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      )}
    </View>
  );
};

export default ScanScreenView;
