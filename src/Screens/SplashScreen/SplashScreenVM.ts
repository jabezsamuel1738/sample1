import AsyncStorage from '@react-native-async-storage/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { exceptionLogger } from '../../Helpers/AppCenterHelpers/AppCenterExceptionLogger';
import {
  currentUserInfo,
  getDBConnection,
  insertUserInfo,
} from '../../Helpers/SqliteStorage/SqliteStorage';
import SplashScreenService from '../../Services/SplashScreenService/SplashScreenService';
import { SplashScreenProps } from './SplashScreenProps';

const useSplashScreenVM = (props: SplashScreenProps) => {
  const splashScreenService = new SplashScreenService();

  const showToast = (message: string, type: 'success' | 'error') => {
    Toast.show({
      type: type === 'success' ? 'successToast' : 'errorToast',
      position: 'bottom',
      text1: message,
    });
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        checklogin();
      }, 1000);
    }, []),
  );

  const checklogin = async () => {
    try {
      await remoteConfig().fetchAndActivate();
      await remoteConfig().fetch(0);
      const canUseApp = await remoteConfig().getValue('isUsable');

      if (canUseApp.asBoolean() === true) {
        const dbInstance = await getDBConnection();

        if (dbInstance) {
          const userInfo = await currentUserInfo(dbInstance);

          if (userInfo == null) {
            // props.navigation.navigate('Login');
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          } else {
            const fetchUserName = await AsyncStorage.getItem('Username');
            const fetchPassword = await AsyncStorage.getItem('Password');
            await validateUser(fetchUserName!, fetchPassword!);
          }
        }
      } else {
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Maintenance'}],
        });
      }
    } catch (ex) {
      exceptionLogger(ex);
    }
  };

  const validateUser = async (userName: string, password: string) => {
    try {
      const response = await splashScreenService.ValidateUser(
        userName,
        password,
      );

      if (
        response &&
        response.data &&
        response.data !== 'Invalid Credentials'
      ) {
        const userObj = JSON.parse(response.data.ValidateUserResult);

        if (userObj !== null) {
          const dbInstance = await getDBConnection();

          if (dbInstance) {
            const userInfo = await insertUserInfo(dbInstance, userObj[0]);

            const option = await AsyncStorage.getItem('choosed-option');

            if (option === null) {
              props.navigation.navigate('Login', {isModalVisile: true});
            } else if (option === 'Inventory') {
              props.navigation.reset({
                index: 0,
                routes: [{name: 'InventoryStack'}],
              });
            } else {
              props.navigation.reset({
                index: 0,
                routes: [{name: 'CycleCountStack'}],
              });
            }
          }
        } else {
          await AsyncStorage.clear();
          props.navigation.navigate('Login');
        }
      } else {
        if (response && response.data == 'Invalid Credentials') {
          if (response.data.includes('Invalid Credentials')) {
            showToast('Invalid Credentials, Please try again', 'error');
          } else if (response.message.includes('Response Error')) {
            showToast('Response Error, Please try again', 'error');
          } else {
            showToast('Unknown Error', 'error');
          }
        } else {
          showToast('Service call failed', 'error');
        }
      }
    } catch (ex) {
      exceptionLogger(ex);
    }
  };

  return {
    checklogin,
    validateUser,
  };
};

export default useSplashScreenVM;
