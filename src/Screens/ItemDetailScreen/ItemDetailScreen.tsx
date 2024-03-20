import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ItemDetailScreenStyles} from './ItemDetailScreenStyles';
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {backArrow} from '../../Assets/Images/backArrow';
import {ItemDetailScreenProps} from './ItemDetailScreenProps';
import {FC} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import useItemDetailScreenVM from './ItemDetailScreenVM';
import Toast from 'react-native-toast-message';
import React from 'react';
import { noImage } from '../../Assets/Images/ImageEmpty';
import { BlackColor, PlaceHolderTextColor } from '../../Helpers/Constants/Colors';

const ItemDetailScreen: FC<ItemDetailScreenProps> = props => {
  const {
    adjustmentData,
    adjustmentDataState,
    setAdjustmentDataState,
    reason,
    reasonState,
    setReasonState,
    documentState,
    setDocumentState,
    quantityState,
    setQuantityState,
    goBack,
    updateTapped,
  } = useItemDetailScreenVM(props);
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={ItemDetailScreenStyles.container}>
          <View style={ItemDetailScreenStyles.headContainer}>
            <TouchableOpacity
              style={ItemDetailScreenStyles.arrowContainer}
              onPress={goBack}>
              <SvgXml xml={backArrow} width="100%" height="100%" />
            </TouchableOpacity>
            <Text style={ItemDetailScreenStyles.heading}>
              Inventory Details
            </Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={ItemDetailScreenStyles.imageContainer}>
                {props.route.params.ImageURL ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{uri: props.route.params.ImageURL}}
                      resizeMode="contain"
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SvgXml xml={noImage} width={'50%'} height={'50%'} />
                  </View>
                )}
              </View>
              <Text
                style={[
                  ItemDetailScreenStyles.itemTitle,
                  ItemDetailScreenStyles.blackText,
                ]}>
                {props.route.params.Name}
              </Text>
              <Text style={ItemDetailScreenStyles.itemDescription}>
                {`${props.route.params.ItemID} - ${props.route.params.Name} - ${props.route.params.Description}`}
              </Text>

              <View style={ItemDetailScreenStyles.listRow}>
                <Text
                  style={[
                    [ItemDetailScreenStyles.rowTitle, {color: BlackColor}],
                    {color: BlackColor},
                  ]}>
                  Quantity
                </Text>
                <Text style={ItemDetailScreenStyles.rowValue}>
                  : {props.route.params.QTY}
                </Text>
              </View>
              <View style={ItemDetailScreenStyles.listRow}>
                <Text
                  style={[ItemDetailScreenStyles.rowTitle, {color: BlackColor}]}>
                  Bin Location
                </Text>
                <Text style={ItemDetailScreenStyles.rowValue}>
                  :{' '}
                  {`${props.route.params.Location} ${props.route.params.Stock_Level_1} ${props.route.params.Stock_Level_2} ${props.route.params.Stock_Level_3} ${props.route.params.Stock_Level_4}`}
                </Text>
              </View>
              <View style={ItemDetailScreenStyles.listRow}>
                <Text
                  style={[ItemDetailScreenStyles.rowTitle, {color: BlackColor}]}>
                  UOM
                </Text>
                <Text style={ItemDetailScreenStyles.rowValue}>
                  : {props.route.params.UOM}
                </Text>
              </View>
              <View
                style={[
                  ItemDetailScreenStyles.listRow,
                  ItemDetailScreenStyles.paddingBottom,
                ]}>
                <Text
                  style={[ItemDetailScreenStyles.rowTitle, {color: BlackColor}]}>
                  Adjustment Type
                </Text>
                <Dropdown
                  value={adjustmentDataState}
                  placeholder="Select"
                  selectedTextStyle={{color: BlackColor, fontSize: 12}}
                  data={adjustmentData}
                  labelField="label"
                  valueField="value"
                  onChange={item => setAdjustmentDataState(item.value)}
                  showsVerticalScrollIndicator={false}
                  placeholderStyle={ItemDetailScreenStyles.dropdownPlaceholder}
                  style={ItemDetailScreenStyles.inputContainer}
                  itemTextStyle={{color: BlackColor, fontSize: 12}}
                />
              </View>
              <View
                style={[
                  ItemDetailScreenStyles.listRow,
                  ItemDetailScreenStyles.paddingBottom,
                ]}>
                <Text
                  style={[ItemDetailScreenStyles.rowTitle, {color: BlackColor}]}>
                  Reason
                </Text>
                <Dropdown
                  value={reasonState}
                  placeholder="Select Reason"
                  selectedTextStyle={{color: BlackColor, fontSize: 12}}
                  data={reason}
                  labelField="label"
                  valueField="label"
                  onChange={item => setReasonState(item.label)}
                  showsVerticalScrollIndicator={false}
                  placeholderStyle={ItemDetailScreenStyles.dropdownPlaceholder}
                  style={ItemDetailScreenStyles.inputContainer}
                  dropdownPosition="top"
                  itemTextStyle={{color: BlackColor, fontSize: 12}}
                />
              </View>
              <View
                style={[
                  ItemDetailScreenStyles.listRow,
                  ItemDetailScreenStyles.paddingBottom,
                ]}>
                <Text
                  style={[ItemDetailScreenStyles.rowTitle, {color: BlackColor}]}>
                  Document
                </Text>
                <TextInput
                  value={documentState}
                  onChangeText={setDocumentState}
                  placeholderTextColor={PlaceHolderTextColor}
                  maxLength={200}
                  style={[
                    ItemDetailScreenStyles.rowValue,
                    ItemDetailScreenStyles.inputContainer,
                    ItemDetailScreenStyles.textInput,
                  ]}
                  placeholder="Enter #"
                />
              </View>
              <View
                style={[
                  ItemDetailScreenStyles.listRow,
                  ItemDetailScreenStyles.paddingBottom,
                ]}>
                <Text
                  style={[ItemDetailScreenStyles.rowTitle, {color: BlackColor}]}>
                  Adjust Quantity
                </Text>
                <TextInput
                  keyboardType="numeric"
                  value={quantityState}
                  onChangeText={text => {
                    const numericText = text.replace(/[^0-9]/g, '');
                    setQuantityState(numericText);
                  }}
                  maxLength={2}
                  placeholderTextColor={PlaceHolderTextColor}
                  style={[
                    ItemDetailScreenStyles.rowValue,
                    ItemDetailScreenStyles.inputContainer,
                    ItemDetailScreenStyles.textInput,
                  ]}
                  placeholder="Enter #"
                />
              </View>
              <View style={ItemDetailScreenStyles.bottomContainer}>
                <View style={[ItemDetailScreenStyles.buttonContainer]}>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      goBack();
                    }}
                    style={ItemDetailScreenStyles.cancelContainer}>
                    <Text style={ItemDetailScreenStyles.cancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    updateTapped();
                  }}
                  style={[
                    ItemDetailScreenStyles.buttonContainer,
                    ItemDetailScreenStyles.updateContainer,
                  ]}>
                  <Text style={ItemDetailScreenStyles.update}>Update</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default ItemDetailScreen;
