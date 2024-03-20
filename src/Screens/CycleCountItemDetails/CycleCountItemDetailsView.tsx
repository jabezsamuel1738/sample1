import React, {FC} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {AboutDarkInfo} from '../../Assets/Images/AboutDarkInfo';
import {noImage} from '../../Assets/Images/ImageEmpty';
import {Settings} from '../../Assets/Images/settings';
import Header from '../Components/HeaderComponent/HeaderView';
import {CycleCountItemDetailsProps} from './CycleCountItemDetailsProps';
import {Styles} from './CycleCountItemDetailsStyles';
import useCycleCountItemDetailsVM from './CycleCountItemDetailsVM';
import {
  BlackColor,
  GreyColor,
  NavigationActiveColor,
  PlaceHolderTextColor,
  WhiteColor,
} from '../../Helpers/Constants/Colors';

const CycleCountItemDetailsView: FC<CycleCountItemDetailsProps> = props => {
  const {
    goBack,
    modalVisible,
    navigateToAbout,
    navigateToSettings,
    okClicked,
    setModalVisible,
    updateInLocalDB,
    count,
    item,
    setCount,
  } = useCycleCountItemDetailsVM(props);

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={modalVisible ? NavigationActiveColor : WhiteColor}
      />
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: WhiteColor}}>
          <KeyboardAvoidingView
            style={Styles.contaier}
            behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
            <Header
              isPrimaryNeed
              navigateToAbout={navigateToAbout}
              isSecondaryNeed
              secondaryicon={Settings}
              secondaryNavigation={navigateToSettings}
              aboutIcon={AboutDarkInfo}
            />
            <ScrollView style={{height: '100%'}}>
              <View style={{padding: 20, flex: 1}}>
                <View style={Styles.emptyWrapper}>
                  <SvgXml xml={noImage} width={'50%'} height={'50%'} />
                </View>
                <Text style={Styles.itemIdText}>{item?.ItemID}</Text>
                <Text style={Styles.itemName}>{item?.Name}</Text>
                <Text style={{color: GreyColor, fontSize: 14, marginTop: 10}}>
                  {item?.Description}
                </Text>
                <Text style={Styles.leftText}>
                  Last Updated On:{' '}
                  <Text style={Styles.rightText}>
                    {item?.LastUpdated.split(' ')[0]}
                  </Text>
                </Text>
                <Text style={Styles.leftText}>
                  Bin Location:{' '}
                  <Text style={Styles.rightText}>{item?.Location}</Text>
                </Text>
                <Text style={Styles.leftText}>
                  UOM: <Text style={Styles.rightText}>{item?.UOM}</Text>
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={Styles.inputText}>Item Count:</Text>
                  <View style={Styles.inputWrapper}>
                    <TextInput
                      value={count}
                      placeholder="Enter #"
                      placeholderTextColor={PlaceHolderTextColor}
                      maxLength={2}
                      style={{color: BlackColor}}
                      keyboardType="numeric"
                      onChangeText={text => {
                        const numericText = text.replace(/[^0-9]/g, '');
                        setCount(numericText);
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: 20,
                  paddingHorizontal: 24,
                }}>
                <TouchableOpacity onPress={goBack} style={Styles.cancelButton}>
                  <Text style={Styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={updateInLocalDB}
                  style={Styles.updateButton}>
                  <Text style={Styles.updateText}>Update</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="fade">
              <View style={Styles.modalContainer}>
                <View style={Styles.modalInnerContainer}>
                  <Text style={Styles.modelHeading}>
                    Count mismatch, Please verify again!
                  </Text>
                  <View
                    style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={okClicked}
                      style={Styles.okButton}>
                      <Text style={Styles.okText}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default CycleCountItemDetailsView;
