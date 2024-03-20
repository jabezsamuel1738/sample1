import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform} from 'react-native';
import SplashScreenView from '../Screens/SplashScreen/SplashScreenView';
import LoginScreenView from '../Screens/LoginScreen/LoginScreenView';
import InventoryStack from './InventoryStack';
import AboutScreenView from '../Screens/AboutScreen/AboutScreenView';
import CycleCountStack from './CycleCountStack';
import SettingsScreenView from '../Screens/SettingsScreen/SettingsScreenView';
import ItemDetailScreen from '../Screens/ItemDetailScreen/ItemDetailScreen';
import ScanScreenView from '../Screens/ScanScreen/ScanScreen';
import CycleCountItemDetailsView from '../Screens/CycleCountItemDetails/CycleCountItemDetailsView';
import MaintenanceScreen from '../Screens/MaintenanceScreen/MaintenanceScreen';

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={SplashScreenView}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={LoginScreenView}
      />
      <Stack.Screen
        name="InventoryStack"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={InventoryStack}
      />
      <Stack.Screen
        name="CycleCountStack"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={CycleCountStack}
      />
      <Stack.Screen
        name="AboutUs"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={AboutScreenView}
      />
      <Stack.Screen
        name="Settings"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={SettingsScreenView}
      />
      <Stack.Screen
        name="Detail"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={ItemDetailScreen}
      />
      <Stack.Screen
        name="Scanner"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={ScanScreenView}
      />
      <Stack.Screen
        name="CycleCountDetail"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={CycleCountItemDetailsView}
      />
      <Stack.Screen
        name="Maintenance"
        options={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'ios' : 'default',
        }}
        component={MaintenanceScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
