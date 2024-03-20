import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useRef, useState} from 'react';
import {PanResponder} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import Toast from 'react-native-toast-message';
import {failure} from '../../Assets/Images/failure';
import {UserBO} from '../../BOs/UserBO/UserBO';
import {HttpStatus} from '../../Helpers/Constants/Enums';
import {
  addItemList,
  getCountedItems,
  getCycleDBConnection,
  getPendingItems,
  removeItem,
} from '../../Helpers/CycleCountSqliteStorage/CycleCountSqliteStorage';
import {DependencyInjector} from '../../Helpers/DependencyInjector/DependencyInjector';
import {
  currentUserInfo,
  getDBConnection,
} from '../../Helpers/SqliteStorage/SqliteStorage';
import {CycleCountScreenProps} from './CycleCountScreenProps';
import {exceptionLogger} from '../../Helpers/AppCenterHelpers/AppCenterExceptionLogger';
import { ItemDetailsBO } from '../../BOs/ItemDetailsBO/ItemDetailsBO';
import { success } from '../../Assets/Images/success';

const CycleCountScreenVM = (props: CycleCountScreenProps) => {
  const [currentStatus, setCurrentStatus] = useState<'Pending' | 'Counted'>(
    'Pending',
  );
  const [data, setData] = useState<ItemDetailsBO[]>([]);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [settingNeed, setSettingsNeed] = useState<boolean>(false);
  const {CycleCountServices} = DependencyInjector.getInstances();

  useFocusEffect(
    useCallback(() => {
      init();
    }, [currentStatus]),
  );

  const init = async () => {
    try {
      setSyncing(true);
      const db = await getCycleDBConnection();

      if (db) {
        setMessage('Loading...');

        setData([]);

        if (currentStatus === 'Pending') {
          await getPending(db);
        } else {
          await getCounted(db);
        }
      }
      setSyncing(false);
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const getCounted = async (db: SQLiteDatabase) => {
    try {
      const result = await getCountedItems(db);

      if (result == null || result.length === 0) {
        setData([]);
      } else {
        setData(result);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const getPending = async (db: SQLiteDatabase) => {
    try {
      const result = await getPendingItems(db);

      if (result == null || result.length === 0) {
        setData([]);
      } else {
        setData(result);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const onChangeStatus = (userChoice: 'Pending' | 'Counted') => {
    setCurrentStatus(userChoice);
  };

  const onClickSync = async () => {
    try {
      const userdb = await getDBConnection();
      if (userdb) {
        const user = await currentUserInfo(userdb);

        if (user) {
          const db = await getCycleDBConnection();

          if (db) {
            const counted = await getCountedItems(db);

            if (counted?.length === 0 || counted === null) {
              const enableDownload = await AsyncStorage.getItem(
                'enable-download',
              );

              if (enableDownload === 'true') {
                await downloadItems(user);
              } else {
                setSettingsNeed(true);
              }
            } else {
              const enableUpload = await AsyncStorage.getItem('enable-upload');

              if (enableUpload === 'true') {
                setMessage('Syncing....');
                setSyncing(true);
                const response = await CycleCountServices.updateCycleCountItems(
                  counted,
                  user.UserID,
                );

                if (response.data && response.data.length !== 0) {
                  const db = await getCycleDBConnection();
                  if (db) {
                    const remove = await removeItem(db, response.data);

                    await downloadItems(user);
                  } else {
                    Toast.show({
                      autoHide: true,
                      position: 'bottom',
                      type: 'tomatoToast',
                      text1: 'Failed To upload your local DB',
                      props: {
                        icon: failure,
                        cancelCallback: cancelToast,
                      },
                    });
                  }
                } else {
                  Toast.show({
                    autoHide: true,
                    position: 'bottom',
                    type: 'tomatoToast',
                    text1: 'Failed To upload Data',
                    props: {
                      icon: failure,
                      cancelCallback: cancelToast,
                    },
                  });
                }
                setSyncing(false);
              } else {
                setSettingsNeed(true);
              }
            }
          }
        }
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const downloadItems = async (user: UserBO) => {
    try {
      const enableDownload = await AsyncStorage.getItem('enable-download');

      if (enableDownload === 'true') {
        setMessage('Downloading items.....');
        setSyncing(true);
        const request = await CycleCountServices.downloadCycleCountItems(
          200,
          user.UserID,
        );

        if (request.status === HttpStatus.Success) {
          if (request.data && request.data.length !== 0) {
            const db = await getCycleDBConnection();

            if (db) {
              const response = await addItemList(db, request.data);

              if (currentStatus === 'Pending') {
                await getPending(db);
              } else {
                await getCounted(db);
              }
            }
          } else {
            Toast.show({
              autoHide: true,
              position: 'bottom',
              type: 'tomatoToast',
              text1: 'No data found',
              props: {
                icon: success,
                cancelCallback: cancelToast,
              },
            });
          }

          setSyncing(false);
        } else {
          setSyncing(false);
          Toast.show({
            autoHide: true,
            position: 'bottom',
            type: 'tomatoToast',
            text1: 'Failed To download Data',
            props: {
              icon: failure,
              cancelCallback: cancelToast,
            },
          });
        }
      } else {
        setSyncing(false);
        setSettingsNeed(true);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const cancelToast = () => {
    Toast.hide();
  };

  const onClickScan = async () => {
    props.navigation.navigate('Scanner');
  };

  const onClickAbout = async () => {
    props.navigation.navigate('AboutUs');
  };

  const navigateToDetails = async (item: ItemDetailsBO) => {
    props.navigation.navigate('CycleCountDetail', {item: item});
  };

  const goToSettings = async () => {
    setSettingsNeed(false);
    props.navigation.navigate('Settings');
  };

  const closeModal = async () => {
    setSettingsNeed(false);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const {dx, dy} = gestureState;

        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) {
            onChangeStatus('Pending');
          } else if (dx < 0) {
            onChangeStatus('Counted');
          }
        }
      },
    }),
  ).current;

  return {
    onChangeStatus,
    currentStatus,
    onClickSync,
    onClickAbout,
    onClickScan,
    data,
    navigateToDetails,
    syncing,
    setSyncing,
    message,
    settingNeed,
    setSettingsNeed,
    goToSettings,
    closeModal,
    panResponder,
  };
};

export default CycleCountScreenVM;
