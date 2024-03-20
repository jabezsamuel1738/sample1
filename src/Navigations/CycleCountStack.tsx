import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable, StyleSheet, Text, View, Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {AccountFocused} from '../Assets/Images/AccountFocused';
import {AccountUnFocused} from '../Assets/Images/AccountUnFocused';
import {HomeFocused} from '../Assets/Images/HomeFocused';
import {HomeUnFocused} from '../Assets/Images/HomeUnFocused';
import {ScanIcon} from '../Assets/Images/ScanIcon';
import AccountScreenView from '../Screens/AccountScreen/AccountScreenView';
import CycleCountScreen from '../Screens/CycleCountScreen/CycleCountScreenView';
import ScanScreenView from '../Screens/ScanScreen/ScanScreen';
import {
  BlackColor,
  PrimaryColor,
  TabBackground,
  TabBarShadowColor,
  WhiteColor,
} from '../Helpers/Constants/Colors';

const CycleCountStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: Platform.OS === 'ios' ? 90 : 60,
          backgroundColor: WhiteColor,
          shadowColor: TabBarShadowColor,
          shadowOffset: {
            width: -2,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={CycleCountScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <View
                  style={[
                    styles.tabBarIconWrapper,
                    {backgroundColor: TabBackground},
                  ]}>
                  <SvgXml width={20} height={20} xml={HomeFocused} />
                  <Text
                    style={{
                      color: PrimaryColor,
                      fontWeight: '600',
                      marginLeft: 10,
                    }}>
                    Home
                  </Text>
                </View>
              );
            }

            return (
              <View style={styles.tabBarIconWrapper}>
                <SvgXml width={18} height={18} xml={HomeUnFocused} />
                <Text
                  style={{
                    color: BlackColor,
                    fontWeight: '600',
                    marginLeft: 12,
                  }}>
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="InventoryScan"
        component={ScanScreenView}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return <SvgXml width={30} height={30} xml={ScanIcon} />;
          },
          tabBarButton: props => <CustomTabBarIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="CycleAccount"
        component={AccountScreenView}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <View
                  style={[
                    styles.tabBarIconWrapper,
                    {backgroundColor: TabBackground},
                  ]}>
                  <SvgXml width={18} height={18} xml={AccountFocused} />
                  <Text
                    style={{
                      color: PrimaryColor,
                      fontWeight: '600',
                      marginLeft: 10,
                    }}>
                    Account
                  </Text>
                </View>
              );
            }

            return (
              <View style={styles.tabBarIconWrapper}>
                <SvgXml width={18} height={18} xml={AccountUnFocused} />
                <Text
                  style={{
                    color: BlackColor,
                    fontWeight: '600',
                    marginLeft: 10,
                  }}>
                  Account
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const CustomTabBarIcon = (props: any) => {
  const {children, onPress} = props;
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          top: -37,
          justifyContent: 'center',
          alignItems: 'center',
        },
        styles.shadow,
      ]}>
      <View
        style={[
          {
            width: 62,
            height: 62,
            borderRadius: 31,
            backgroundColor: WhiteColor,
          },
          styles.shadow,
        ]}>
        {children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: TabBarShadowColor,
    shadowOffset: {
      width: -2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  logo: {
    width: 18,
    height: 18,
  },
  tabBarIconWrapper: {
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
});

export default CycleCountStack;
