import React, {FC} from 'react';
import {
  FlatList,
  Modal,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {info} from '../../Assets/Images/info';
import {logo} from '../../Assets/Images/logo';
import {scanner} from '../../Assets/Images/scanner';
import {search} from '../../Assets/Images/search';
import {sync} from '../../Assets/Images/sync';
import {ListEmptyComponent} from '../Components/ListEmptyComponent/ListEmptyComponent';
import ListrenderItem from '../Components/ListRenderItemComponent/ListRenderItem';
import {InventoryAdjustmentScreenProps} from './InventoryAdjustmentScreenProps';
import {
  InventoryAdjustmentScreenStyles,
  LoaderStyles,
  PopupStyles,
} from './InventoryAdjustmentScreenStyles';
import useInventoryAdjustmentScreenVM from './InventoryAdjustmentScreenVM';
import Header from '../Components/HeaderComponent/HeaderView';
import {AboutDarkInfo} from '../../Assets/Images/AboutDarkInfo';
import {
  BlackColor,
  LightGreyColor,
  NavigationActiveColor,
  PrimaryColor,
  WhiteColor,
} from '../../Helpers/Constants/Colors';

const InventoryAdjustmentScreen: FC<InventoryAdjustmentScreenProps> = props => {
  const {
    textInput,
    setTextInput,
    itemListState,
    toItemDetailScreen,
    syncTapped,
    loaderState,
    loaderMessage,
    itemsCount,
    popupState,
    dismissPopup,
    popupMessage,
    toAboutUsScreen,
    navigateToScanner,
    onSearchItem,
    ontextChange,
    isModalVisible,
    setIsModalVisible,
  } = useInventoryAdjustmentScreenVM(props);
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={
          loaderState || popupState || isModalVisible
            ? NavigationActiveColor
            : WhiteColor
        }
      />
      <SafeAreaProvider>
        <SafeAreaView style={InventoryAdjustmentScreenStyles.container}>
          <Header
            aboutIcon={AboutDarkInfo}
            isPrimaryNeed
            isSecondaryNeed
            navigateToAbout={toAboutUsScreen}
            secondaryicon={scanner}
            secondaryNavigation={navigateToScanner}
          />

          <View style={{paddingHorizontal: 24, flex: 1}}>
            <View
              style={[
                InventoryAdjustmentScreenStyles.rowContainer,
                {marginTop: 0, alignItems: 'flex-end'},
              ]}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text style={InventoryAdjustmentScreenStyles.title}>
                  Inventory Adjustment
                </Text>
              </View>

              <TouchableOpacity
                onPress={syncTapped}
                style={InventoryAdjustmentScreenStyles.syncContainer}>
                <SvgXml xml={sync} width="100%" height="100%" />
              </TouchableOpacity>
            </View>

            <View style={InventoryAdjustmentScreenStyles.textInputContainer}>
              <TextInput
                style={InventoryAdjustmentScreenStyles.textInput}
                placeholder="Search"
                placeholderTextColor={LightGreyColor}
                maxLength={25}
                value={textInput}
                onChangeText={ontextChange}
                clearButtonMode="always"
              />
              <TouchableOpacity
                onPress={onSearchItem}
                style={InventoryAdjustmentScreenStyles.searchContainer}>
                <SvgXml xml={search} width="100%" height="100%" />
              </TouchableOpacity>
            </View>
            <View style={InventoryAdjustmentScreenStyles.listContainer}>
              {itemListState.length !== 0 ? (
                <FlatList
                  // ListEmptyComponent={<ListEmptyComponent />}
                  data={itemListState}
                  renderItem={({item}) => (
                    <ListrenderItem
                      item={item}
                      onPress={() => toItemDetailScreen(item)}
                    />
                  )}
                  keyExtractor={item => item.ItemID.toString() + item.BarcodeID}
                  showsVerticalScrollIndicator={false}
                />
              ) : isModalVisible ? (
                <></>
              ) : (
                <ListEmptyComponent />
              )}
            </View>
          </View>

          <Modal visible={loaderState} transparent={true} animationType="fade">
            <View style={LoaderStyles.container}>
              <View style={LoaderStyles.body}>
                <Progress.Circle
                  indeterminate={true}
                  color={PrimaryColor}
                  size={24}
                />
                <Text
                  style={LoaderStyles.message}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {loaderMessage}
                </Text>
              </View>
            </View>
          </Modal>
          <Modal visible={popupState} transparent={true} animationType="fade">
            <View style={PopupStyles.container}>
              <View style={PopupStyles.body}>
                <Text style={PopupStyles.title}>{popupMessage}</Text>
                <Text style={PopupStyles.description}>
                  Items Downloaded :{' '}
                  <Text style={PopupStyles.count}>{itemsCount}</Text>
                </Text>
                <View style={PopupStyles.bottomContainer}>
                  <TouchableOpacity
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={dismissPopup}>
                    <Text style={PopupStyles.button}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {}}>
            <View style={PopupStyles.modalContainer}>
              <View
                style={{
                  backgroundColor: WhiteColor,
                  borderRadius: 50,
                  alignItems: 'center',
                  padding: 7,
                  justifyContent: 'center',
                  elevation: 5,
                  shadowColor: BlackColor,
                  shadowOffset: {width: 0, height: 0},
                  shadowOpacity: 1,
                  shadowRadius: 6,
                }}>
                <Progress.Circle
                  indeterminate={true}
                  color={PrimaryColor}
                  borderWidth={4}
                />
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default InventoryAdjustmentScreen;
