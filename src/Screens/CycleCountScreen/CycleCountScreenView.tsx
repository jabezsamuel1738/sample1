import React, {FC} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {AppIcon} from '../../Assets/Images/SdiIcon';
import {ScanIcon} from '../../Assets/Images/scan';
import {InfoIcon} from '../../Assets/Images/InfoIcon';
import {Refresh} from '../../Assets/Images/Refresh';
import CycleCountScreenVM from './CycleCountScreenVM';
import {CycleCountScreenStyles as styles} from './CycleCountScreenStyles';
import {CycleCountScreenProps} from './CycleCountScreenProps';
import {ListRenderItemStyles} from '../Components/ListRenderItemComponent/ListRenderItemStyles';
import {location} from '../../Assets/Images/location';
import {forwardArrow} from '../../Assets/Images/forwardArrow';
import {Settings} from '../../Assets/Images/settings';
import {AboutDarkInfo} from '../../Assets/Images/AboutDarkInfo';
import Header from '../Components/HeaderComponent/HeaderView';
import {ListEmptyComponent} from '../Components/ListEmptyComponent/ListEmptyComponent';
import { BlackColor, LightGreyColor2, NavigationActiveColor, PrimaryColor, SwitchBorderColor, WhiteColor } from '../../Helpers/Constants/Colors';

const CycleCountScreen: FC<CycleCountScreenProps> = props => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {
    onChangeStatus,
    currentStatus,
    onClickSync,
    onClickAbout,
    data,
    onClickScan,
    navigateToDetails,
    message,
    setSyncing,
    syncing,
    settingNeed,
    setSettingsNeed,
    goToSettings,
    closeModal,
    panResponder,
  } = CycleCountScreenVM(props);

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={syncing ? NavigationActiveColor : WhiteColor}
      />
      <SafeAreaView style={styles.container}>
        <Header
          isPrimaryNeed
          isSecondaryNeed={true}
          navigateToAbout={onClickAbout}
          secondaryicon={Settings}
          secondaryNavigation={goToSettings}
          aboutIcon={AboutDarkInfo}
        />

        <View
          style={{paddingHorizontal: 24, flex: 1}}
          {...panResponder.panHandlers}>
          <View style={styles.cycleCountHeader}>
            <Text style={styles.cycleCountHeaderText}>Cycle Count</Text>
            <TouchableOpacity onPress={onClickSync}>
              <SvgXml
                height={30}
                width={30}
                style={styles.refreshIcon}
                xml={Refresh}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.cycleCountOptions}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                onChangeStatus('Pending');
              }}
              style={styles.cycleCountOption}>
              <Text
                style={[
                  styles.cycleCountOptionText,
                  currentStatus === 'Pending'
                    ? styles.pendingText
                    : {color: LightGreyColor2},
                ]}>
                Pending
              </Text>
              <View
                style={[
                  styles.borderBottom,
                  {
                    borderBottomColor:
                      currentStatus === 'Pending' ? PrimaryColor : SwitchBorderColor,
                  },
                ]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                onChangeStatus('Counted');
              }}
              style={styles.cycleCountOption}>
              <Text
                style={[
                  styles.cycleCountOptionText,
                  currentStatus === 'Counted'
                    ? styles.countedText
                    : {color: LightGreyColor2},
                ]}>
                Counted
              </Text>
              <View
                style={[
                  styles.borderBottom,
                  {
                    borderBottomColor:
                      currentStatus === 'Counted' ? PrimaryColor : SwitchBorderColor,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginBottom: 55}}>
            {data.length > 0 ? (
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigateToDetails(item);
                      }}
                      {...panResponder.panHandlers}
                      key={item.Id}
                      activeOpacity={0.5}
                      style={[
                        styles.listItemContainer,
                        {marginBottom: index === data.length - 1 ? 20 : 0},
                      ]}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={ListRenderItemStyles.title}>
                          {item.ItemID}
                        </Text>
                        <View style={ListRenderItemStyles.rowContainer}>
                          <View style={ListRenderItemStyles.svgContainer}>
                            <SvgXml xml={location} width="100%" height="100%" />
                          </View>
                          <Text style={ListRenderItemStyles.location}>
                            {item.Location}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flex: 1,
                          }}>
                          <Text
                            style={ListRenderItemStyles.description}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {item.Description}
                          </Text>
                        </View>
                        <View
                          style={ListRenderItemStyles.rowContainer}
                          hitSlop={ListRenderItemStyles.hitSlop}>
                          <Text style={ListRenderItemStyles.buttonText}>
                            View
                          </Text>
                          <View style={ListRenderItemStyles.arrowContainer}>
                            <SvgXml
                              xml={forwardArrow}
                              width="100%"
                              height="100%"
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <ListEmptyComponent style={{marginBottom: 50}} />
            )}
          </View>

          <Modal visible={syncing} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalInnerContainer}>
                <ActivityIndicator
                  style={{marginLeft: 20}}
                  color={PrimaryColor}
                  size={40}
                />
                <Text
                  style={{
                    color: BlackColor,
                    marginLeft: 20,
                    fontSize: 16,
                    fontWeight: '800',
                  }}>
                  {message}
                </Text>
              </View>
            </View>
          </Modal>
          <Modal visible={settingNeed} transparent={true} animationType="none">
            <TouchableOpacity
              onPress={closeModal}
              style={styles.modalContainer}>
              <View
                style={[styles.modalInnerContainer, {flexDirection: 'column'}]}>
                <Text
                  style={{
                    color: BlackColor,
                    fontSize: 15,
                    fontWeight: '600',
                    marginLeft: 10,
                  }}>
                  Please change the setting to update and download.
                </Text>
                <TouchableOpacity
                  onPress={goToSettings}
                  style={{
                    height: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Text
                    style={{color: PrimaryColor, fontSize: 16, fontWeight: '800'}}>
                    Go to Settings
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CycleCountScreen;
