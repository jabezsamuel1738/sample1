import React, {FC} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {AccountScreenProps} from './AccountScreenProps';
import {Styles} from './AccountScreenStyles';
import useAccountScreenVM from './AccountScreenVM';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {RadioButtonchecked} from '../../Assets/Images/RadioButton2';
import {RadioButtonUnchecked} from '../../Assets/Images/RadioButton';
import {Settings} from '../../Assets/Images/settings';
import Header from '../Components/HeaderComponent/HeaderView';
import {AboutDarkInfo} from '../../Assets/Images/AboutDarkInfo';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  ClickableTextColor,
  GreyColor,
  NavigationActiveColor,
  PrimaryTextColor,
  WhiteColor,
} from '../../Helpers/Constants/Colors';


{
  setSelectedDB : fn()
  selectedDB : string
}
const AccountScreenView: FC<AccountScreenProps> = props => {
  const {
    userDetails,
    changeDB,
    navigateToAbout,
    logOutUser,
    options,
    selectedDB,
    setSelectedDB,
    setShowModal,
    showModal,
    isCycleCount,
    navigateToSettings,
    closeModal,
    formattedPhone,
  } = useAccountScreenVM(props);
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <>
      <StatusBar
        backgroundColor={showModal ? NavigationActiveColor : WhiteColor}
        barStyle={'dark-content'}
      />
      <SafeAreaProvider>
        <SafeAreaView style={Styles.container}>
          <Header
            isPrimaryNeed
            isSecondaryNeed={isCycleCount}
            navigateToAbout={navigateToAbout}
            secondaryicon={isCycleCount ? Settings : undefined}
            secondaryNavigation={navigateToSettings}
            aboutIcon={AboutDarkInfo}
          />
          <ScrollView style={{flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <View style={Styles.imageWrapper}></View>
              {userDetails ? (
                <>
                  <Text style={Styles.nameText}>{userDetails.Name}</Text>
                  <Text style={Styles.userIdText}>
                    {userDetails.BusinessUnitName}
                  </Text>
                  <Text style={[Styles.userIdText, Styles.marginTop4]}>
                    {userDetails?.UserID}
                  </Text>
                </>
              ) : (
                <>
                  <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={Styles.nameShimmer}
                  />
                  <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={Styles.businessIdShimmer}
                  />
                  <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={Styles.userIdShimmer}
                  />
                </>
              )}
            </View>
            <View style={{alignItems: 'stretch'}}>
              <View style={Styles.inputWrapper}>
                <Text style={Styles.labelText}>Mail</Text>
                {userDetails ? (
                  <Text style={Styles.valueText}>{userDetails.Email}</Text>
                ) : (
                  <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={Styles.valueShimmer}
                  />
                )}
              </View>
              <View style={Styles.inputWrapper}>
                <Text style={Styles.labelText}>Phone</Text>
                {userDetails ? (
                  <Text style={Styles.valueText}>{formattedPhone}</Text>
                ) : (
                  <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={Styles.valueShimmer}
                  />
                )}
              </View>
              <View style={Styles.inputWrapper}>
                <Text style={Styles.labelText}>Database</Text>
                {userDetails ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={Styles.valueText}>
                      {userDetails.CurrentDB}
                    </Text>
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                      <Text
                        style={[
                          Styles.valueText,
                          {
                            color: ClickableTextColor,
                            borderBottomColor: ClickableTextColor,
                            borderBottomWidth: 1,
                          },
                        ]}>
                        Change DB
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={Styles.valueShimmer}
                  />
                )}
              </View>
            </View>
            <TouchableOpacity style={Styles.button} onPress={logOutUser}>
              <Text style={Styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(false);
            }}>
            <Pressable
              style={Styles.modalContainer}
              onPress={() => {
                setShowModal(false);
              }}>
              <View style={Styles.modalWrapper}>
                <Text style={Styles.modalHeading}>
                  Which environment you'd like to switch?
                </Text>
                {options.map((option, index) => {
                  return (
                    <Pressable
                      key={option.value}
                      disabled={option.enable}
                      style={Styles.radioButtonWrapper}
                      onPress={() => setSelectedDB(option.value)}>
                      <View style={{marginRight: 5}}>
                        <SvgXml
                          xml={
                            option.value === selectedDB && option.enable
                              ? RadioButtonchecked
                              : RadioButtonUnchecked
                          }
                          height={16}
                          style={{marginTop: 2}}
                        />
                      </View>
                      <View>
                        <Text
                          style={[
                            Styles.radioTitle,
                            {
                              color: option.enable
                                ? PrimaryTextColor
                                : GreyColor,
                            },
                          ]}>
                          {option.title}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
                <View
                  style={{
                    paddingHorizontal: 20,
                    marginBottom: 20,
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={Styles.proceedButton}
                    onPress={changeDB}>
                    <Text style={Styles.proceedText}>Proceed</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default AccountScreenView;
