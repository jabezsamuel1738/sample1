import React, {FC} from 'react';
import {FlatList, Modal, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {info} from '../../Assets/Images/info';
import {logo} from '../../Assets/Images/logo';
import {scanner} from '../../Assets/Images/scanner';
import {CountedItemsScreenStyles} from './CountedItemsScreenStyle';
import {ContedItemsScreenProps} from './CountedItemsScreenProps';
import useCountedItemsScreenVM from './CountedItemsScreenVm';
import ListrenderItem from '../Components/ListRenderItemComponent/ListRenderItem';
import {ListEmptyComponent} from '../Components/ListEmptyComponent/ListEmptyComponent';
import * as Progress from 'react-native-progress';
import Header from '../Components/HeaderComponent/HeaderView';
import {AboutDarkInfo} from '../../Assets/Images/AboutDarkInfo';
import { BlackColor, PrimaryColor, WhiteColor } from '../../Helpers/Constants/Colors';

export const CountedItemsScreen: FC<ContedItemsScreenProps> = props => {
  const {
    countedItems,
    toItemDetailScreen,
    toAboutUsScreen,
    isModalVisible,
    setIsModalVisible,
    navigateToScanner,
  } = useCountedItemsScreenVM(props);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={CountedItemsScreenStyles.container}>
        <Header
          aboutIcon={AboutDarkInfo}
          isPrimaryNeed
          isSecondaryNeed
          navigateToAbout={toAboutUsScreen}
          secondaryicon={scanner}
          secondaryNavigation={navigateToScanner}
        />
        <Text style={CountedItemsScreenStyles.heading}>Counted Items</Text>
        <View style={{paddingHorizontal: 24, paddingTop: 5, flex: 1}}>
          {countedItems.length !== 0 ? (
            <FlatList
              // ListEmptyComponent={<ListEmptyComponent />}
              data={countedItems}
              renderItem={({item}) => (
                <ListrenderItem
                  item={item}
                  onPress={() => toItemDetailScreen(item)}
                />
              )}
              keyExtractor={item => item.ItemID.toString() + item.BarcodeID}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <ListEmptyComponent />
          )}
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {}}>
          <View style={CountedItemsScreenStyles.modalContainer}>
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
  );
};
