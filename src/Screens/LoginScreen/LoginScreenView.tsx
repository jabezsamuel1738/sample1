import React from 'react';

import {FC} from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Modal,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {SvgXml} from 'react-native-svg';
import {RadioButtonUnchecked} from '../../Assets/Images/RadioButton';
import {RadioButtonchecked} from '../../Assets/Images/RadioButton2';
import {eye} from '../../Assets/Images/eye';
import {logo} from '../../Assets/Images/logo';
import ToastComponent from '../Components/ToastComponent/ToastComponent';
import {LoginScreenProps} from './LoginScreenProps';
import {LoginScreenStyles} from './LoginScreenStyles';
import LoginScreenVM from './LoginScreenVM';
import {eyeoff} from '../../Assets/Images/eyeoff';
import {
  BlackColor,
  BorderColor,
  NavigationActiveColor,
  PrimaryColor,
  SecondaryBorder,
  WhiteColor,
} from '../../Helpers/Constants/Colors';

const LoginScreenView: FC<LoginScreenProps> = props => {
  const {
    onTaploginButton,
    setUserName,
    setPassword,
    isPasswordVisible,
    setPasswordVisibility,
    isModalVisible,
    selectedOption,
    selections,
    setIsModalVisible,
    setSelectedOption,
    navigateToOption,
    loggingIn,
  } = LoginScreenVM(props);

  return (
    <>
      <StatusBar
        backgroundColor={isModalVisible ? NavigationActiveColor : WhiteColor}
        barStyle={'dark-content'}
      />
      <View style={LoginScreenStyles.mainContainer}>
        <View style={[LoginScreenStyles.mainView]}>
          <View style={LoginScreenStyles.logoTitle}>
            <SvgXml xml={logo} width="111" height="51" />
            <Text style={LoginScreenStyles.textStyle}>
              Login to your Account
            </Text>
          </View>

          <KeyboardAvoidingView style={{backgroundColor: 'white', flex: 2}}>
            <View style={LoginScreenStyles.textIputView}>
              <View style={{width: '92%'}}>
                <Text style={LoginScreenStyles.labelText}>User ID</Text>
              </View>
              <View style={{width: '92%'}}>
                <TextInput
                  autoCapitalize="characters"
                  placeholderTextColor={BorderColor}
                  clearButtonMode="always"
                  placeholder="Enter your User ID"
                  maxLength={25}
                  style={LoginScreenStyles.textinput}
                  onChangeText={value => {
                    setUserName(value);
                  }}
                />
              </View>

              <View style={{width: '92%'}}>
                <Text style={LoginScreenStyles.labelText}>Password</Text>
              </View>
              <View style={LoginScreenStyles.passwordContainer}>
                <TextInput
                  autoCapitalize="none"
                  hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Enter your Password"
                  maxLength={25}
                  clearButtonMode="always"
                  placeholderTextColor={BorderColor}
                  style={LoginScreenStyles.passTextinput}
                  onChangeText={value => {
                    setPassword(value);
                  }}
                />
                <TouchableOpacity
                  style={LoginScreenStyles.eyeIconContainer}
                  hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
                  onPress={() => setPasswordVisibility(!isPasswordVisible)}>
                  {isPasswordVisible ? (
                    <SvgXml xml={eye} />
                  ) : (
                    <SvgXml xml={eyeoff} />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={LoginScreenStyles.button}
                onPress={onTaploginButton}>
                <Text style={LoginScreenStyles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View style={{flex: 0.5, justifyContent: 'space-evenly'}}>
            <View />
            <View style={LoginScreenStyles.reachText}>
              <Text style={LoginScreenStyles.issueStyle}>For issues</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${'+12156331900'}`);
                }}>
                <Text style={LoginScreenStyles.helpDeskText}>
                  Reach helpdesk
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {!isModalVisible && <ToastComponent />}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {}}>
          <View style={LoginScreenStyles.modalContainer}>
            {loggingIn ? (
              <View
                style={{
                  backgroundColor: WhiteColor,
                  borderRadius: 50,
                  alignItems: 'center',
                  padding: 7,
                  justifyContent: 'center',
                }}>
                <Progress.Circle
                  indeterminate={true}
                  color={PrimaryColor}
                  borderWidth={4}
                />
              </View>
            ) : (
              <View style={LoginScreenStyles.modalWrapper}>
                <Text style={LoginScreenStyles.modalHeading}>
                  What information you’d like to see?
                </Text>
                {selections.map((option, index) => {
                  return (
                    <Pressable
                      key={option.name}
                      style={[
                        LoginScreenStyles.radioButtonWrapper,
                        {
                          borderBottomColor:
                            index === selections.length - 1
                              ? WhiteColor
                              : SecondaryBorder,
                        },
                      ]}
                      onPress={() => setSelectedOption(option.name)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                        }}>
                        <SvgXml
                          xml={
                            option.name === selectedOption
                              ? RadioButtonchecked
                              : RadioButtonUnchecked
                          }
                          style={{
                            marginRight: 10,
                          }}
                        />
                        <View>
                          <Text style={LoginScreenStyles.radioTitle}>
                            {option.title}
                          </Text>
                          <Text style={LoginScreenStyles.radioDescription}>
                            {option.description}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
                <View
                  style={{
                    paddingHorizontal: 20,
                    marginBottom: 20,
                    marginTop: 21,
                  }}>
                  <TouchableOpacity
                    style={LoginScreenStyles.proceedButton}
                    onPress={navigateToOption}>
                    <Text style={LoginScreenStyles.proceedText}>Proceed</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </>
  );
};

export default LoginScreenView;
