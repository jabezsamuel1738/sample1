import {useCallback, useState} from 'react';
import {ContedItemsScreenProps} from './CountedItemsScreenProps';
import {ItemBO} from '../../BOs/ItemBO/ItemBO';
import {useFocusEffect} from '@react-navigation/native';
import {
  currentUserInfo,
  getCountedItems,
  getDBConnection,
} from '../../Helpers/SqliteStorage/SqliteStorage';
import {exceptionLogger} from '../../Helpers/AppCenterHelpers/AppCenterExceptionLogger';

const useCountedItemsScreenVM = ({navigation}: ContedItemsScreenProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [countedItems, setCountedItems] = useState<ItemBO[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const toAboutUsScreen = () => {
    navigation.navigate('AboutUs');
  };

  const loadData = async () => {
    try {
      setIsModalVisible(true);
      const db = await getDBConnection();
      if (db) {
        const user = await currentUserInfo(db);
        if (user) {
          const items: ItemBO[] =
            (await getCountedItems(db, user.UserID)) ?? [];
          setCountedItems(items);
        }
        setIsModalVisible(false);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const toItemDetailScreen = (item: ItemBO) => {
    navigation.navigate('Detail', item);
  };

  const navigateToScanner = async () => {
    navigation.navigate('Scanner');
  };

  return {
    isModalVisible,
    setIsModalVisible,
    countedItems,
    toItemDetailScreen,
    toAboutUsScreen,
    navigateToScanner,
  };
};

export default useCountedItemsScreenVM;
