import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountScreenView from '../Screens/AccountScreen/AccountScreenView';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import {SvgXml} from 'react-native-svg';
import {InventoryUnFocused} from '../Assets/Images/InventoryUnFocused';
import {InventoryFocused} from '../Assets/Images/InventoryFocused';
import {CountedItemUnFocused} from '../Assets/Images/CountedItemUnFocused';
import {CountedItemFocused} from '../Assets/Images/CountedItemFocused';
import {AccountUnFocused} from '../Assets/Images/AccountUnFocused';
import {AccountFocused} from '../Assets/Images/AccountFocused';

import React, {useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import AboutScreenView from '../Screens/AboutScreen/AboutScreenView';
import InventoryAdjustmentScreen from '../Screens/InventoryAdjustmentScreen/InventoryAdjustmentScreen';
import {CountedItemsScreen} from '../Screens/CountedItemsScreen/CountedItemsScreen';
import {
  BlackColor,
  PrimaryColor,
  TabBackground,
  WhiteColor,
} from '../Helpers/Constants/Colors';
import {InvenoryStackBO} from '../BOs/InventoryStackBO/InventoryStackBO';

const TabArr: InvenoryStackBO[] = [
  {
    route: 'CountedItems',
    label: 'Counted Items',
    component: CountedItemsScreen,
    focused: CountedItemFocused,
    unfocused: CountedItemUnFocused,
  },
  {
    route: 'Inventory',
    label: 'Inventory',
    component: InventoryAdjustmentScreen,
    focused: InventoryFocused,
    unfocused: InventoryUnFocused,
  },
  {
    route: 'InventoryAccount',
    label: 'My Account',
    component: AccountScreenView,
    focused: AccountFocused,
    unfocused: AccountUnFocused,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      viewRef?.current?.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef?.current?.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: WhiteColor, borderRadius: 16},
          ]}
        />
        <View
          style={[
            styles.btn,
            {backgroundColor: focused ? TabBackground : WhiteColor},
          ]}>
          <SvgXml
            width={18}
            height={18}
            xml={focused ? item.focused : item.unfocused}
          />
          <View>
            {focused && (
              <Text
                style={{
                  paddingHorizontal: 8,
                  color: PrimaryColor,
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                {item.label}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const InventoryStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inventory"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 90 : 60,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: BlackColor,
    elevation: 4,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },
});

export default InventoryStack;
