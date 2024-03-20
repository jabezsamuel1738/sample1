import {useCallback, useRef, useState} from 'react';
import {ItemBO} from '../../BOs/ItemBO/ItemBO';
import {UserBO} from '../../BOs/UserBO/UserBO';
import {DependencyInjector} from '../../Helpers/DependencyInjector/DependencyInjector';

import Toast from 'react-native-toast-message';
import {failure} from '../../Assets/Images/failure';
import {ItemCatalogSyncDetailBO} from '../../BOs/ItemCatalogSyncDetailBO/ItemCatalogSyncDetailBO';
import {HttpStatus} from '../../Helpers/Constants/Enums';
import {
  currentUserInfo,
  getAllItemDetails,
  getCountedItems,
  getDBConnection,
  getItemDetails,
  insertItemsInCommonDB,
  insertLastSyncDateTimeInLocalDB,
  readLastSyncDateTimeInLocalDB,
  updateItemList,
} from '../../Helpers/SqliteStorage/SqliteStorage';
import {InventoryAdjustmentScreenProps} from './InventoryAdjustmentScreenProps';
import {
  defaultFetchCount,
  DateFormat,
} from '../../Helpers/Constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {exceptionLogger} from '../../Helpers/AppCenterHelpers/AppCenterExceptionLogger';
import moment from 'moment';

const useInventoryAdjustmentScreenVM = ({
  navigation,
}: InventoryAdjustmentScreenProps) => {
  const {AppShellServices} = DependencyInjector.getInstances();
  const [itemListState, setItemListState] = useState<ItemBO[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [loaderState, setLoaderState] = useState<boolean>(false);
  const [popupState, setPopupState] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>('');
  const [popupMessage, setPopUpMessage] = useState<string>('');
  const [itemsCount, setItemCount] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  let data = useRef<ItemBO[]>([]);

  useFocusEffect(
    useCallback(() => {
      getAllItems();
    }, []),
  );

  const getAllItems = async () => {
    try {
      setIsModalVisible(true);
      const db = await getDBConnection();
      if (db) {
        const items = await getAllItemDetails(db);
        setItemListState(items ?? []);
      }
      setIsModalVisible(false);
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const toItemDetailScreen = (item: ItemBO) => {
    navigation.navigate('Detail', item);
  };
  const toAboutUsScreen = () => {
    navigation.navigate('AboutUs');
  };
  const cancelToast = () => {
    Toast.hide();
  };

  const syncTapped = async () => {
    try {
      const db = await getDBConnection();
      if (db) {
        const user = await currentUserInfo(db);
        if (user === null) {
          throw new Error();
        }
        uploadItems(user);
      }
    } catch (error) {
      Toast.show({
        autoHide: true,
        position: 'bottom',
        type: 'tomatoToast',
        text1: "Can't fetch user info",
        props: {
          icon: failure,
          cancelCallback: cancelToast,
        },
      });
      exceptionLogger(error);
    }
  };

  const uploadItems = async (user: UserBO) => {
    try {
      const db = await getDBConnection();
      if (db) {
        setLoaderMessage('Uploading changes...');
        setLoaderState(true);

        const items: ItemBO[] = (await getCountedItems(db, user.UserID)) ?? [];

        const updateDate = await AsyncStorage.setItem(
          'countedItemsInventory',
          JSON.stringify(items),
        );

        if (items.length > 0) {
          items.forEach(item => {
            item.Description = '';
            item.ImageURL = '';
            item.Name = '';
          });
          const response = await AppShellServices.updateItemList(
            items,
            user.UserID,
          );

          setLoaderState(false);
          if (response.status !== HttpStatus.Success) {
            Toast.show({
              autoHide: true,
              position: 'bottom',
              type: 'tomatoToast',
              text1: "Can't upload items",
              props: {
                icon: failure,
                cancelCallback: cancelToast,
              },
            });
          }
        }
      }
    } catch (error) {
      setLoaderState(false);
      Toast.show({
        autoHide: true,
        position: 'bottom',
        type: 'tomatoToast',
        text1: "Can't upload items",
        props: {
          icon: failure,
          cancelCallback: cancelToast,
        },
      });
      exceptionLogger(error);
    }
    downloadItems(user);
  };

  const downloadItems = async (user: UserBO) => {
    try {
      setLoaderMessage('Downloading latest count...');
      setLoaderState(true);
      const internetSpeed: number = await internetSpeedTest();
      const db = await getDBConnection();
      if (db) {
        const itemCatalogSyncDetail: ItemCatalogSyncDetailBO = {
          BusinessUnitId: user.BusinessUnitId,
          DBName: user.CurrentDB,
          Id: 0,
          LastItemSyncDatetime: '',
        };
        const lastSync = await readLastSyncDateTimeInLocalDB(
          db,
          itemCatalogSyncDetail,
        );
        const response = await AppShellServices.getDownloadedCount(
          lastSync,
          user,
        );
        if (response.status === HttpStatus.Failed) {
          Toast.show({
            autoHide: true,
            position: 'bottom',
            type: 'tomatoToast',
            text1: 'Download count is failed',
            props: {
              icon: failure,
              cancelCallback: cancelToast,
            },
          });
        } else if (
          response.status === HttpStatus.Success &&
          response.data !== null
        ) {
          downloadAllItems(
            response.data,
            internetSpeed,
            lastSync,
            user,
            itemCatalogSyncDetail,
          );
        } else {
          Toast.show({
            autoHide: true,
            position: 'bottom',
            type: 'tomatoToast',
            text1: 'Download count is 0',
            props: {
              icon: failure,
              cancelCallback: cancelToast,
            },
          });
        }
      }
    } catch (error) {
      Toast.show({
        autoHide: true,
        position: 'bottom',
        type: 'tomatoToast',
        text1: "Can't get download count",
        props: {
          icon: failure,
          cancelCallback: cancelToast,
        },
      });
      exceptionLogger(error);
    }
  };

  const downloadAllItems = async (
    count: number,
    internetSpeed: number,
    lastSyncDate: string,
    userInfo: UserBO,
    syncDetail: ItemCatalogSyncDetailBO,
  ) => {
    try {
      let items: ItemBO[] = [];

      const db = await getDBConnection();
      if (db) {
        if (internetSpeed < 0) {
          Toast.show({
            autoHide: true,
            position: 'bottom',
            type: 'tomatoToast',
            text1: 'Internet connection required',
            props: {
              icon: failure,
              cancelCallback: cancelToast,
            },
          });
        } else {
          let start = 0;
          let itemId: string = '';
          let barcodeId: string = '';
          count = count < 200 ? count : 200;
          for (
            let end = 0;
            end <= count + defaultFetchCount - 1;
            end += defaultFetchCount
          ) {
            if (start === count) {
              break;
            }
            if (end === 0) {
              end += defaultFetchCount;
            }
            if (end > count) {
              end = count;
            }

            const response = await AppShellServices.fetchItems(
              userInfo,
              start,
              end,
              itemId,
              barcodeId,
              lastSyncDate,
            );

            if (response.status === HttpStatus.NotFound) {
              Toast.show({
                autoHide: true,
                position: 'bottom',
                type: 'tomatoToast',
                text1: 'Data is empty',
                props: {
                  icon: failure,
                  cancelCallback: cancelToast,
                },
              });
              break;
            }
            start = end;
            const temp = response.data ?? [];
            items.push(...temp);
            itemId = items[items.length - 1].ItemID;
            barcodeId = items[items.length - 1].BarcodeID;
          }

          if (items.length === count) {
            const lastSyncDate = await readLastSyncDateTimeInLocalDB(
              db,
              syncDetail,
            );
            await insertItemsInCommonDB(db, items, userInfo, lastSyncDate);
            const dbItems = (await getAllItemDetails(db)) ?? [];
            setLoaderState(false);
            setItemCount(items.length);
            setPopUpMessage('Download Complete');
            setItemListState(dbItems);
            setPopupState(true);
            data.current = items;
            const utcTime = new Date();
            const easternTimeOffset = -300;
            const easternTime = new Date(
              utcTime.getTime() + easternTimeOffset * 60000,
            );
            moment.locale('en');
            const formattedDate = moment().format(DateFormat);
            syncDetail.LastItemSyncDatetime = formattedDate;
            syncDetail.BusinessUnitId = userInfo.BusinessUnitId;
            syncDetail.DBName = userInfo.CurrentDB;
            await insertLastSyncDateTimeInLocalDB(db, syncDetail);
            setLoaderState(false);
          } else {
            setLoaderState(false);
            setItemCount(items.length);
            setPopUpMessage('Download Failed!');
            setPopupState(true);
          }
          const getCountedItemfromLocal = await AsyncStorage.getItem(
            'countedItemsInventory',
          );

          if (getCountedItemfromLocal) {
            const parsedItems: ItemBO[] = JSON.parse(getCountedItemfromLocal);
            const update = await updateItemList(db, parsedItems, userInfo);
          }
        }
      }
    } catch (error) {
      Toast.show({
        autoHide: true,
        position: 'bottom',
        type: 'tomatoToast',
        text1: 'Cant download data, Error occured',
        props: {
          icon: failure,
          cancelCallback: cancelToast,
        },
      });
      exceptionLogger(error);
    }
    setLoaderState(false);
  };

  const internetSpeedTest = async (): Promise<number> => {
    try {
      const date1: Date = new Date();
      const response: Response = await fetch(
        'https://raw.githubusercontent.com/TheProfs/socket-mem-leak/master/10mb-sample.json',
      );

      if (response.ok) {
        const data: Uint8Array = new Uint8Array(await response.arrayBuffer());
        const date2: Date = new Date();
        const speed: number = Math.round(
          data.length / 1024 / (date2.getTime() - date1.getTime()) / 1000,
        );

        return speed;
      }
      return 0;
    } catch (error) {
      exceptionLogger(error);
      return 0;
    }
  };

  const dismissPopup = () => {
    setPopupState(false);
  };

  const navigateToScanner = () => {
    navigation.navigate('Scanner');
  };

  const onSearchItem = async () => {
    try {
      setLoaderMessage('Searching...');
      setLoaderState(true);
      const db = await getDBConnection();
      if (db) {
        const user = await currentUserInfo(db);

        if (user) {
          const result = await getItemDetails(db, user, textInput);

          if (result) {
            setItemListState(result);
          }
        }
      }
      setLoaderState(false);
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const ontextChange = (value: string) => {
    setTextInput(value);
    if (value.trim() === '') {
      setItemListState(data.current);
    }
  };

  return {
    textInput,
    setTextInput,
    syncTapped,
    itemListState,
    toItemDetailScreen,
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
  };
};

export default useInventoryAdjustmentScreenVM;
