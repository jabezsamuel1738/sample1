import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {LoginScreenProps} from './LoginScreenProps';
import SplashScreenService from '../../Services/SplashScreenService/SplashScreenService';
import {
  getDBConnection,
  insertUserInfo,
} from '../../Helpers/SqliteStorage/SqliteStorage';
import {tick} from '../../Assets/Images/tick';
import {failure} from '../../Assets/Images/failure';
import {Keyboard} from 'react-native';
import {ModeBO} from '../../BOs/ModeBO/ModeBO';
import {exceptionLogger} from '../../Helpers/AppCenterHelpers/AppCenterExceptionLogger';

const LoginScreenVM = (props: LoginScreenProps) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<'Cycle' | 'Inventory'>(
    'Cycle',
  );
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loggingIn, setLogginIn] = useState<boolean>(false);
  const splashScreenService = new SplashScreenService();
  const showToast = (message: string, type: 'success' | 'error') => {
    Toast.show({
      type: 'tomatoToast',
      position: 'bottom',
      text1: message,
      props: {
        icon: type == 'success' ? tick : failure,
        cancelCallback: () => {
          Toast.hide();
        },
      },
    });
  };

  useEffect(() => {
    if (props.route.params) {
      setIsModalVisible(props.route.params.isModalVisile);
    }
  }, [props.route.params]);

  const onTaploginButton = async () => {
    try {
      Keyboard.dismiss();
      if (userName.trim() === '' && password.trim() === '') {
        showToast('Enter the username and password', 'error');
      } else if (userName.trim() === '') {
        showToast('Enter the username', 'error');
      } else if (password.trim() === '') {
        showToast('Enter the password', 'error');
      } else {
        setLogginIn(true);
        setIsModalVisible(true);
        const result = await splashScreenService.ValidateUser(
          userName,
          password,
        );
        if (!result || !result.data || !result.data.ValidateUserResult) {
          showToast('Error while login, Please try again', 'error');
          setIsModalVisible(false);
        } else if (
          result &&
          result.data &&
          result.data.ValidateUserResult === 'Invalid Credentials'
        ) {
          setIsModalVisible(false);
          showToast('Invalid Credentials, Please try again', 'error');
          return;
        } else if (result && result.message.includes('Response Error')) {
          setIsModalVisible(false);
          showToast('Response Error, Please try again', 'error');
          return;
        } else {
          const parseUser = JSON.parse(result.data.ValidateUserResult);
          const dbInstance = await getDBConnection();

          if (dbInstance) {
            const userInfo = await insertUserInfo(dbInstance, parseUser[0]);
            await AsyncStorage.setItem('Username', userName);
            await AsyncStorage.setItem('Password', password);
          }
          setLogginIn(false);
        }
      }
    } catch (error) {
      setIsModalVisible(false);
      showToast('Something went wrong, try again!', 'error');
      exceptionLogger(error);
    }
  };

  const selections: ModeBO[] = [
    {
      name: 'Cycle',
      title: 'Cycle Count',
      description: 'Used to count the item from SDI warehouse',
    },
    {
      name: 'Inventory',
      title: 'Inventory Adjustment',
      description: 'To Adjust the inventory item quantity in the warehouse',
    },
  ];

  const navigateToOption = async () => {
    await AsyncStorage.setItem('choosed-option', selectedOption);
    setIsModalVisible(false);
    if (selectedOption === 'Inventory') {
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
  };

  return {
    onTaploginButton,
    setUserName,
    setPassword,
    isPasswordVisible,
    setPasswordVisibility,
    selections,
    isModalVisible,
    setIsModalVisible,
    selectedOption,
    setSelectedOption,
    navigateToOption,
    loggingIn,
    setLogginIn,
  };
};

export default LoginScreenVM;
