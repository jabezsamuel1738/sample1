import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {UserBO} from '../../BOs/UserBO/UserBO';
import {AccountScreenProps} from './AccountScreenProps';
import {
  currentUserInfo,
  deleteAllTables,
  getDBConnection,
} from '../../Helpers/SqliteStorage/SqliteStorage';
import {
  getCycleDBConnection,
  removeAllItems,
} from '../../Helpers/CycleCountSqliteStorage/CycleCountSqliteStorage';
import {exceptionLogger} from '../../Helpers/AppCenterHelpers/AppCenterExceptionLogger';

const useAccountScreenVM = (props: AccountScreenProps) => {
  const [userDetails, setUserDetails] = useState<UserBO>();
  const [selectedDB, setSelectedDB] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isCycleCount, setIsCycleCount] = useState<boolean>(false);
  const [formattedPhone, setformattedPhone] = useState<string>('');

  useEffect(() => {
    init();
  }, []);

  const method1 = async () => {
    const dbInstance = await getDBConnection();
    
  }




  const init = async () => {
    try {
      const dbInstance = await getDBConnection();

      if (dbInstance) {
        const userInfo = await currentUserInfo(dbInstance);
        if (userInfo?.Phone) {
          const phoneSplit = () => {
            const phone = userInfo?.Phone;
            if (phone) {
              const formattedPhone = phone.replace(
                /(\d{3})(\d{3})(\d{4})/,
                '$1-$2-$3',
              );
              setformattedPhone(formattedPhone);
            }
          };
          if (userInfo.Phone) {
            phoneSplit();
          }
          setUserDetails(userInfo);

          setSelectedDB(userInfo.CurrentDB);
        } else {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
      }

      const mode = await AsyncStorage.getItem('choosed-option');

      if (mode && mode === 'Cycle') {
        setIsCycleCount(true);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const changeDB = async () => {
    setShowModal(false);
  };

  const logOutUser = async () => {
    try {
      await AsyncStorage.clear();
      const dbInstance = await getDBConnection();
      if (dbInstance) {
        await deleteAllTables(dbInstance);
      }
      const db = await getCycleDBConnection();

      if (db) {
        await removeAllItems(db);
      }

      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const navigateToAbout = () => {
    props.navigation.navigate('AboutUs');
  };

  const options = [
    {
      value: 'DEVL',
      title: 'DEVL',
      enable: true,
    },
  ];

  const navigateToSettings = async () => {
    props.navigation.navigate('Settings');
  };

  const closeModal = async () => {
    setShowModal(false);
  };

  return {
    userDetails,
    changeDB,
    navigateToAbout,
    logOutUser,
    options,
    selectedDB,
    setSelectedDB,
    showModal,
    setShowModal,
    isCycleCount,
    navigateToSettings,
    closeModal,
    formattedPhone,
  };
};

export default useAccountScreenVM;
